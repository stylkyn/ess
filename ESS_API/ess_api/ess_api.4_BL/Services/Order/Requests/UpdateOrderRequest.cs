using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using System;

namespace ess_api._4_BL.Services.Order.Requests
{
    public class UpdateOrderRequest : Request
    {
        [Guid]
        public string OrderId { get; set; }
        public OrderCustomerRequest Customer { get; set; }
        public CalculateOrderRequest CalculateOrder { get; set; }
    }
}
