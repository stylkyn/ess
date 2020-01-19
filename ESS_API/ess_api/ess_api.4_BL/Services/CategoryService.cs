using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ess_api._4_BL.Services
{
    public class CategoryService : MainService
    {
        /*
         * GET
         * **/
        public List<CategoryResponse> Get()
        {
            return MapCategories(_uow.Categories.FindMany().ToList());
        }

        public CategoryResponse Get(string Id)
        {
            return MapCategory(_uow.Categories.Find(new Guid(Id)));
        }

        /*
         *  SET
         * **/
        public void Add(CategoryRequest category)
        {
            _uow.Categories.Insert(category);
        }

        public void Update(CategoryRequest category)
        {
            _uow.Categories.Replace(category.Id, category);
        }

        public void Remove(string id)
        {
            _uow.Categories.Delete(new Guid(id));
        }

        private CategoryResponse MapCategory(CategoryModel category)
        {
            return new CategoryResponse
            {
                Id = category.Id.ToString(),
                Name = category.Name,
                ParentCategoryId = category.ParentCategoryId
            };
        }

        private List<CategoryResponse> MapCategories(List<CategoryModel> categories)
        {
            return categories.Select(x => MapCategory(x)).ToList();
        }
    }
}
