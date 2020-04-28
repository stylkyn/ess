using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
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
            var categories = await _uow.Categories.FindManyAsync();
            return new ResponseList<CategoryResponse>(ResponseStatus.Ok, MapCategoryTree(categories.ToList()));
        }

        public async Task<Response<CategoryResponse>> GetTree(string id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(id));
            return new Response<CategoryResponse>(ResponseStatus.Ok, MapCategoryTree(category));
        }

        public async Task<ResponseList<CategoryResponse>> Get()
        {
            
            var categories = await _uow.Categories.FindManyAsync();
            return new ResponseList<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategories(categories.ToList()));
        }

        public async Task<Response<CategoryResponse>> GetByUrl(string urlName)
        {
            var categories = await _uow.Categories.FindManyAsync(x => x.UrlName == urlName);
            if (categories == null)
                return new Response<CategoryResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var response = categories.FirstOrDefault();
            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(response));
        }

        public async Task<Response<CategoryResponse>> Get(string id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(id));
            if (category == null)
                return new Response<CategoryResponse>(ResponseStatus.NotFound, _mapService.MapCategory(category), ResponseMessages.NotFound);

            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(category));
        }

        public async Task<ResponseList<CategoryResponse>> Search(CategorySearchRequest request)
        {
            int skip = request.PageNumber * request.PageSize;
            (var categories, int total) = await _uow.Categories.SearchCategory(request.FullText, skip, request.PageSize);
            if (categories == null)
                return new ResponseList<CategoryResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

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
                ParentCategoryId = request.ParentCategoryId
            };

            await _uow.Categories.InsertAsync(category);
            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(category));
        }

        public async Task<Response<CategoryResponse>> Update(CategoryRequest request)
        {
            var category = await _uow.Categories.FindAsync(new Guid(request.Id));

            category.Name = request.Name;
            category.UrlName = WebUtility.UrlEncode(request.UrlName);
            category.ParentCategoryId = request.ParentCategoryId;

            await _uow.Categories.ReplaceAsync(category.Id, category);
            return new Response<CategoryResponse>(ResponseStatus.Ok, _mapService.MapCategory(category));
        }

        public async Task<Response> Remove(CategoryRemoveRequest request)
        {
            await _uow.Categories.DeleteAsync(new Guid(request.Id));
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
