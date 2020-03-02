using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api.Infrastructure.Repositories
{
    public class UserRepository : Repository<UserModel>, IUserRepository
    {
        public UserRepository(DBContext _db) : base(_db) { }

        public async Task<UserModel> GetUser(string email)
        {
            var users = await FindManyAsync(x => x.Email == email);
            if (users.Count == 0)
                return null;

            return users.FirstOrDefault();
        }
    }
}
