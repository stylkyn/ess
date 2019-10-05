using ess_api.Core.Interface;
using ess_api.Core.Model;

namespace ess_api.Core.Interfaces
{
    public interface IUserRepository : IRepository<user>
    {
        user GetUserByLogin(Login login);
        user GetUserBySocialLogin(SocialLogin socialLogin);
    }
}

