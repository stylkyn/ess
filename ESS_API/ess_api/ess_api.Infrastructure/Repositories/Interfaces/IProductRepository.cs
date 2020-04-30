using ess_api.Core.Interface;
using ess_api.Core.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface IProductRepository : IRepository<ProductModel>
    {
        Task<List<ProductModel>> Search();
        Task<List<ProductModel>> Search(string categoryId);
        Task<List<ProductModel>> Search(List<string> categories);
        Task<(List<ProductModel>, int)> SearchExtend(string categoryId, string fullText, int skip, int take);
    }
}
