using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Response<CategoryResponse>> GetTree(string Id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(Id));
            return new Response<CategoryResponse>(ResponseStatus.Ok, MapCategoryTree(category));
        }

        public async Task<ResponseList<CategoryResponse>> Get()
        {
            
            var categories = await _uow.Categories.FindManyAsync();
            return new ResponseList<CategoryResponse>(ResponseStatus.Ok, MapCategories(categories.ToList()));
        }

        public async Task<Response<CategoryResponse>> Get(string Id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(Id));
            if (category == null)
                return new Response<CategoryResponse>(ResponseStatus.NotFound, MapCategory(category), $"Category with Id: {Id} was not founded");

            return new Response<CategoryResponse>(ResponseStatus.Ok, MapCategory(category));
        }

        /*
         *  SET
         * **/
        public async Task<Response> Add(CategoryRequest category)
        {
            var newCategory = new CategoryModel
            {
                Name = category.Name,
                ParentCategoryId = category.ParentCategoryId
            };

            await _uow.Categories.InsertAsync(newCategory);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Update(CategoryRequest category)
        {
            var newCategory = new CategoryModel
            {
                Name = category.Name,
                ParentCategoryId = category.ParentCategoryId
            };

            await _uow.Categories.ReplaceAsync(new Guid(category.Id), newCategory);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Remove(string id)
        {
            await _uow.Categories.DeleteAsync(new Guid(id));
            return new Response(ResponseStatus.Ok);
        }

        private CategoryResponse MapCategory(CategoryModel category)
        {
            return new CategoryResponse
            {
                Id = category.Id.ToString(),
                Name = category.Name,
                ParentCategoryId = category.ParentCategoryId,
            };
        }

        private List<CategoryResponse> MapCategories(List<CategoryModel> categories)
        {
            return categories.Select(x => MapCategory(x)).ToList();
        }

        private CategoryResponse MapCategoryTree(CategoryModel category, List<CategoryModel> categoriesFlat = null)
        {
            if (categoriesFlat == null)
                categoriesFlat = new List<CategoryModel>();

            string categoryId  = category.Id.ToString();
            return new CategoryResponse
            {
                Id = categoryId,
                Name = category.Name,
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
