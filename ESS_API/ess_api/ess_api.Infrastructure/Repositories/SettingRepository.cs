using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api.Infrastructure.Repositories
{
    public class SettingRepository : Repository<SettingModel>, ISettingRepository
    {
        public SettingRepository(DBContext _db) : base(_db) { }

        public async Task<SettingModel> GetSettings()
        {
            var settings = await FindManyAsync();
            if (settings.Count == 0)
            {
                var newSetting = new SettingModel();
                await InsertAsync(newSetting);
                settings.Add(newSetting);
            }

            return settings.FirstOrDefault();
        }
    }
}
