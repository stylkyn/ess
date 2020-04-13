using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Order.Responses
{
    public class OrderResponse : ResponseData
    {
        public OrderState State { get; set; }
        public int OrderNumber { get; set; }
        public OrderCustomer Customer { get; set; }
        public OrderTransport Transport { get; set; }
        public OrderPayment Payment { get; set; }
        public CalculatedOrderResponse CalculatedData { get; set; }
    }
}
