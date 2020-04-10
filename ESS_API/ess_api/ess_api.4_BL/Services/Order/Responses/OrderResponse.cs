using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Order.Responses
{
    public class OrderResponse : ResponseData
    {
        [JsonProperty("state")]
        public OrderState State { get; set; }

        [JsonProperty("orderNumber")]
        public int OrderNumber { get; set; }

        [JsonProperty("customer")]
        public OrderCustomer Customer { get; set; }

        [JsonProperty("transport")]
        public OrderTransport Transport { get; set; }

        [JsonProperty("payment")]
        public OrderPayment Payment { get; set; }

        [JsonProperty("calculatedData")]
        public CalculatedOrderResponse CalculatedData { get; set; }
    }
}
