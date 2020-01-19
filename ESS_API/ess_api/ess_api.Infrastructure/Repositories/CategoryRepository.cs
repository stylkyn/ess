using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;

namespace ess_api.Repository
{
    public class CategoryRepository : Repository<CategoryModel>, ICategoryRepository
    {
        public CategoryRepository(DBContext _db) : base(_db) { }
    }
}
