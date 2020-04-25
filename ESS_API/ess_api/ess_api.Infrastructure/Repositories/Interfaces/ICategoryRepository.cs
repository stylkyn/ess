using ess_api.Core.Interface;
using ess_api.Core.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface ICategoryRepository : IRepository<CategoryModel>
    {
        Task<(List<CategoryModel>, int)> SearchCategory(string fullText, int skip, int take);
    }
}
