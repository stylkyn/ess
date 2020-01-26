using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Repository
{
    public class ProductRepository : Repository<ProductModel>, IProductRepository
    {

        public ProductRepository(DBContext _db) : base(_db) { }

        public async Task<List<ProductModel>> Search(string categoryId)
        {
            return await FindManyAsync(x => 
                x.CategoryId == categoryId || categoryId == null);
        }
    }
}

