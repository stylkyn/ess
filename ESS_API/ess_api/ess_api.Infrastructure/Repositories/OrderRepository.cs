using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System.Threading.Tasks;

namespace ess_api.Infrastructure.Repositories
{
    public class OrderRepository : Repository<OrderModel>, IOrderRepository
    {
        public OrderRepository(DBContext _db) : base(_db) { }

        public async Task<OrderModel> GetLastUserOrderInProgress(string userId)
        {
            return await FindAsync(x => x.Customer.UserId == userId, SortType.DESC, x => x.CreatedDate);
        }
    }
}
