using ess_api.Core.Interface;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface IOrderRepository : IRepository<OrderModel>
    {
        Task<OrderModel> GetLastUserOrderInProgress(string userId);
        Task<(List<OrderModel>, int)> Search(string fullText, string userId, OrderState? orderState, PaymentState? paymentState, int skip, int take);
        Task<List<OrderModel>> GetAccountOrders(string userId);
        Task<long> GetNextOrderNumber();
    }
}

