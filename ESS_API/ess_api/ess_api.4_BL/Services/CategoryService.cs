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
            var categories = await _uow.Categories.FindManyAsymc();
            return new ResponseList<CategoryResponse>(ResponseStatus.Ok, MapCategoryTree(categories.ToList()));
        }

        public async Task<CategoryResponse> GetTree(string Id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(Id));
            return MapCategoryTree(category);
        }

        public async Task<List<CategoryResponse>> Get()
        {
            
            var categories = await _uow.Categories.FindManyAsymc();
            return MapCategories(categories.ToList());
        }

        public async Task<CategoryResponse> Get(string Id)
        {
            var category = await _uow.Categories.FindAsync(new Guid(Id));
            return MapCategory(category);
        }

        /*
         *  SET
         * **/
        public async Task Add(CategoryRequest category)
        {
            var newCategory = new CategoryModel
            {
                Name = category.Name,
                ParentCategoryId = category.ParentCategoryId
            };
            await _uow.Categories.InsertAsync(newCategory);
        }

        public async Task Update(CategoryRequest category)
        {
            var newCategory = new CategoryModel
            {
                Name = category.Name,
                ParentCategoryId = category.ParentCategoryId
            };
            await _uow.Categories.ReplaceAsync(new Guid(category.Id), newCategory);
        }

        public async Task Remove(string id)
        {
            await _uow.Categories.DeleteAsync(new Guid(id));
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
