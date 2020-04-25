using ess_api.Core.Interface;
using ess_api.Core.Model;
using ess_api.DAL.Repository;
using ess_api.Infrastructure.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface IUserRepository : IRepository<UserModel>
    {
        Task<UserModel> GetUser(string email);
        Task<(List<UserModel>, int)> SearchUser(string fullText, int skip, int take, SortType? sortType, UserSortField? sortField);
    }
}

