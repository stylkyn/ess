using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.Repository;

namespace ess_api.Infrastructure.Repositories
{
    public class LanguageRepository : Repository<language>, ILanguageRepository
    {
        public LanguageRepository(EssContext _db) : base(_db) { }
    }
}
