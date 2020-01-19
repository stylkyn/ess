using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;

namespace ess_api.Infrastructure.Repositories
{
    public class UserRepository : Repository<UserModel>, IUserRepository
    {
        public UserRepository(DBContext _db) : base(_db) { }

        public UserModel GetUserByLogin(Login login)
        {
            return null;
            //return _db.
            //    .Where(u => u.password == login.password && (u.username == login.username || u.email == login.username))
            //    .FirstOrDefault();
        }

        public UserModel GetUserBySocialLogin(SocialLogin socialLogin)
        {
            return null;
            //return _db.users
            //    .Where(u => (u.fb_Id == socialLogin.fb_Id && u.fb_Id != null)
            //        || (u.google_Id == socialLogin.google_Id && u.google_Id != null))
            //    .FirstOrDefault();
        }
    }
}
