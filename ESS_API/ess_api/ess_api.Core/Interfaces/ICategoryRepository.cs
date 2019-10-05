using ess_api.Core.Interface;
using ess_api.Core.LanguageModel;
using ess_api.Core.Model;
using System.Collections.Generic;

namespace ess_api.Core.Interfaces
{
    public interface ICategoryRepository : IRepository<category>
    {
        IEnumerable<CategoryLan> GetAllLan();
    }
}
