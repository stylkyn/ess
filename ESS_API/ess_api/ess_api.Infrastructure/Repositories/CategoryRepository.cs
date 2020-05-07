using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Repository
{
    public class CategoryRepository : Repository<CategoryModel>, ICategoryRepository
    {
        public CategoryRepository(DBContext _db) : base(_db) { }
        public async Task<(List<CategoryModel>, int)> SearchCategory(string fullText, int skip, int take)
        {
            string fullTextCleared = fullText?.Trim()?.ToLower() ?? "";
            var result = await FindManyIncludeTotalAsync(x => 
                fullTextCleared == "" 
                || x.Name.ToLower().Contains(fullTextCleared) 
                || x.UrlName.ToLower().Contains(fullTextCleared),
                SortType.DESC, x => x.CreatedDate, skip, take
            );

            return result;
        }
    }
}
