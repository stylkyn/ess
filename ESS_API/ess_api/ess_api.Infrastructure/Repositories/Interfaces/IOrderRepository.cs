using ess_api.Core.Interface;
using ess_api.Core.Model;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface IOrderRepository : IRepository<OrderModel>
    {
        Task<OrderModel> GetLastUserOrderInProgress(string userId);
    }
}

