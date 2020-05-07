using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Repository
{
    public class ProductRepository : Repository<ProductModel>, IProductRepository
    {

        public ProductRepository(DBContext _db) : base(_db) { }

        public async Task<List<ProductModel>> Search()
        {
            return await FindManyAsync(x => true);
        }

        public async Task<List<ProductModel>> Search(string categoryId)
        {
            return await FindManyAsync(x => 
                x.CategoryId == categoryId);
        }

        public async Task<List<ProductModel>> Search(List<string> categories)
        {
            return await FindManyAsync(x => categories.Contains(x.CategoryId) || categories.Count == 0);
        }

        public async Task<(List<ProductModel>, int)> SearchExtend(string categoryId, string fullText, ProductType? type, int skip, int take)
        {
            string fullTextCleared = fullText?.Trim()?.ToLower() ?? "";
            var result = await FindManyIncludeTotalAsync(x =>
                (fullTextCleared == ""
                || x.Name.ToLower().Contains(fullTextCleared)
                || x.UrlName.ToLower().Contains(fullTextCleared))
                && (categoryId == null || x.CategoryId == categoryId)
                && (type == null || x.Type == type),
                SortType.DESC, x => x.CreatedDate, skip, take
            );

            return result;
        }
    }
}

