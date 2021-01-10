using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using ess_api.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services
{
    public class CategoryService : MainService
    {
        /*
         * GET
         * **/
        public async Task<ResponseList<CategoryResponse>> GetTree()
        {
            var categories = await _uow.Categories.FindManyAsync(c => c.IsActive);
            return new ResponseList<CategoryResponse>(ResponseStatus.Ok, MapCategoryTree(categories.ToList()));
        }

        public async Task<Response<CategoryResponse>> GetTree(string id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(id));
            return new Response<CategoryResponse>(ResponseStatus.Ok, MapCategoryTree(category));
        }

        public async Task<ResponseList<CategoryResponse>> Get()
        {
            
            var categories = await _uow.Categories.FindManyAsync(x => true, SortType.ASC, x => x.Name);
            return new ResponseList<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategories(categories.ToList()));
        }

        public async Task<Response<CategoryResponse>> GetByUrl(string urlName)
        {
            var categories = await _uow.Categories.FindManyAsync(x => x.UrlName == urlName && x.IsActive);
            if (categories == null)
                return new Response<CategoryResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var response = categories.FirstOrDefault();
            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(response));
        }

        public async Task<Response<CategoryResponse>> Get(string id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(id));
            if (category == null || !category.IsActive)
                return new Response<CategoryResponse>(ResponseStatus.NotFound, _mapService.MapCategory(category), ResponseMessagesConstans.NotFound);

            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(category));
        }

        public async Task<ResponseList<CategoryResponse>> Search(CategorySearchRequest request)
        {
            int skip = request.PageNumber * request.PageSize;
            (var categories, int total) = await _uow.Categories.SearchCategory(request.FullText, skip, request.PageSize);
            if (categories == null)
                return new ResponseList<CategoryResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            return new ResponseList<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategories(categories), total);
        }

        /*
         *  SET
         * **/
        public async Task<Response> Add(CategoryRequest request)
        {
            var category = new CategoryModel
            {
                Name = request.Name,
                UrlName = WebUtility.UrlEncode(request.UrlName),
                ParentCategoryId = request.ParentCategoryId,
                Image = request.Image,
                IsActive = request.IsActive,
            };

            await _uow.Categories.InsertAsync(category);
            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(category));
        }

        public async Task<Response<CategoryResponse>> Update(CategoryRequest request)
        {
            var category = await _uow.Categories.FindAsync(new Guid(request.Id));
            if (category == null)
                return new Response<CategoryResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            category.Name = request.Name;
            category.UrlName = WebUtility.UrlEncode(request.UrlName);
            category.ParentCategoryId = request.ParentCategoryId;
            category.Image = request.Image;
            category.IsActive = request.IsActive;

            await _uow.Categories.ReplaceAsync(category.Id, category);
            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(category));
        }

        public async Task<Response> Remove(CategoryRemoveRequest request)
        {
            await _uow.Categories.DeleteAsync(new Guid(request.Id));

            // remove category from products, disable visibility of products
            var products = await _uow.Products.FindManyAsync(p => p.CategoryId == request.Id);
            if (products != null)
            {
                var productTasks = new List<Task>();
                foreach(var product in products)
                {
                    product.CategoryId = null;
                    product.IsActive = false;
                    var productTask = _uow.Products.FindAndReplaceAsync(product.Id, product);
                    productTasks.Add(productTask);
                }
                await Task.WhenAll(productTasks);
            }
            return new Response(ResponseStatus.Ok);
        }

        private CategoryResponse MapCategoryTree(CategoryModel category, List<CategoryModel> categoriesFlat = null)
        {
            if (categoriesFlat == null)
                categoriesFlat = new List<CategoryModel>();

            string categoryId = category.Id.ToString();
            return new CategoryResponse
            {
                Id = categoryId,
                Name = category.Name,
                UrlName = category.UrlName,
                ParentCategoryId = category.ParentCategoryId,
                Subcategories = categoriesFlat.Where(x => x.ParentCategoryId == categoryId)
                                              .Select(x => MapCategoryTree(x))
                                              .ToList()
            };
        }

        private List<CategoryResponse> MapCategoryTree(List<CategoryModel> categoriesFlat)
        {
            if (categoriesFlat == null)
                categoriesFlat = new List<CategoryModel>();

            return categoriesFlat.Where(x => x.ParentCategoryId == null)
                                 .Select(x =>
                                    MapCategoryTree(x, categoriesFlat.Where(s => s.ParentCategoryId == x.Id.ToString())
                                                                     .ToList()))
                                 .ToList();
        }
    }
}
