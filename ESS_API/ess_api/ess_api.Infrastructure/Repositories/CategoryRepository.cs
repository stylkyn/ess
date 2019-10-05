using ess_api.Core.Interfaces;
using ess_api.Core.LanguageModel;
using ess_api.Core.Model;
using ess_api.DAL;
using System.Collections.Generic;
using System.Linq;

namespace ess_api.Repository
{
    public class CategoryRepository : Repository<category>, ICategoryRepository
    {
        public CategoryRepository(EssContext _db) : base(_db) { }

        public IEnumerable<CategoryLan> GetAllLan()
        {
            return _db.categories.ToList().Select(v => new CategoryLan
            {
                Id = v.Id,
                description = Lan(v.description_t),
                name = Lan(v.name_t),
                parent_category_Id = v.parent_category_Id
            }).ToList();
        }
    }
}
