using ess_api.Core.Interface;
using ess_api.Core.Model;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface ISettingRepository : IRepository<SettingModel>
    {
        Task<SettingModel> GetSettings();
    }
}

