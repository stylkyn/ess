using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.Repository;
using System.Linq;

namespace ess_api.Infrastructure.Repositories
{
    public class UserRepository : Repository<user>, IUserRepository
    {
        public UserRepository(EssContext _db) : base(_db) { }

        public user GetUserByLogin(Login login)
        {
            return _db.users
                .Where(u => u.password == login.password && (u.username == login.username || u.email == login.username))
                .FirstOrDefault();
        }

        public user GetUserBySocialLogin(SocialLogin socialLogin)
        {
            return _db.users
                .Where(u => (u.fb_Id == socialLogin.fb_Id && u.fb_Id != null)
                    || (u.google_Id == socialLogin.google_Id && u.google_Id != null))
                .FirstOrDefault();
        }
    }
}
