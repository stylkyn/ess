using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Infrastructure.Repositories
{
    public class OrderRepository : Repository<OrderModel>, IOrderRepository
    {
        public OrderRepository(DBContext _db) : base(_db) { }

        public async Task<OrderModel> GetLastUserOrderInProgress(string userId)
        {
            var types = new List<OrderState>() {
                OrderState.Created,
                OrderState.CalculateReady,
                OrderState.TransportReady,
                OrderState.PaymentReady,
                OrderState.CustomerReady
            };
            return await FindAsync(x => x.Customer.UserId == userId && types.Contains(x.State), SortType.DESC, x => x.CreatedDate);
        }

        public async Task<long> GetNextOrderNumber()
        {
            var lastOrder = await Collection().Find(x => true).SortByDescending(x => x.OrderNumber).Limit(1).FirstOrDefaultAsync();
            if (lastOrder == null)
                return 1;

            return lastOrder.OrderNumber + 1;
        }

        public async Task<(List<OrderModel>, int)> Search(string fullText, string userId, OrderState? orderState, PaymentState? paymentState, int skip, int take)
        {
            string fullTextCleared = fullText?.Trim()?.ToLower() ?? "";
            var result = await FindManyIncludeTotalAsync(x =>
                (fullTextCleared == "" || x.OrderNumberFormatted.ToLower().Contains(fullTextCleared))
                && (userId == null || x.Customer.UserId == userId)
                && (orderState == null || x.State == orderState)
                && (paymentState == null || x.Payment.State == paymentState),
                null, null, skip, take
            );

            return result;
        }

        public async Task<List<OrderModel>> GetAccountOrders(string userId)
        {
            var types = new List<OrderState>() {
                OrderState.Confirmed,
                OrderState.Paid,
                OrderState.ReadyToPickup,
                OrderState.ReadyToShip,
                OrderState.Sent,
                OrderState.Delivered
            };
            var result = await FindManyAsync(x => x.Customer != null && x.Customer.UserId == userId
                && types.Contains(x.State));
            return result;
        }
    }
}
