using ess_api.Core.Interface;
using ess_api.Core.Model;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface IUserRepository : IRepository<UserModel>
    {
        Task<UserModel> GetUser(string email);
    }
}

