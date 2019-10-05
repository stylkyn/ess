using ess_api.Core.LanguageModel;
using ess_api.Core.Model;
using System.Collections.Generic;

namespace ess_api._4_BL.Services
{
    public class CategoryService : MainService
    {
        /*
         * GET
         * **/
        public IEnumerable<category> Get()
        {
            return _uow.Categories.GetAll();
        }

        public category Get(int Id)
        {
            return _uow.Categories.Find(Id);
        }

        public IEnumerable<CategoryLan> GetLan()
        {
            return _uow.Categories.GetAllLan();
        }

        /*
         *  SET
         * **/
        public void Add(category Category)
        {
            _uow.Categories.Add(Category);
            _uow.Complete();
        }

        public void Update(category Category)
        {
            _uow.Categories.Update(Category);
            _uow.Complete();
        }

        public void Remove(int Id)
        {
            category Category = Get(Id);
            _uow.Categories.Remove(Category);
            _uow.Complete();
        }

        public void RemoveRange(IEnumerable<category> Categories)
        {
            _uow.Categories.RemoveRange(Categories);
            _uow.Complete();
        }
    }
}
