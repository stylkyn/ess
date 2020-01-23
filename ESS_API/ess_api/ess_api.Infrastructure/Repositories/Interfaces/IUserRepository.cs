using ess_api.Core.Interface;
using ess_api.Core.Model;

namespace ess_api.Core.Interfaces
{
    public interface IUserRepository : IRepository<UserModel>
    {
        UserModel GetUserByLogin(Login login);
        UserModel GetUserBySocialLogin(SocialLogin socialLogin);
    }
}

