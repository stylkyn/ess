using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Order.Responses
{
    public class CalculatedOrderResponse : ResponseData
    {
        [JsonProperty("products")]
        public List<CalculatedOrderProductResponse> Products { get; set; } = new List<CalculatedOrderProductResponse>();

        [JsonProperty("total")]
        public CalculatedOrderTotalResponse Total { get; set; }
    }
    public class CalculatedOrderTotalResponse
    {
        [JsonProperty("totalPrice")]
        public PriceResponse TotalPrice;
    }

    public class CalculatedOrderProductResponse
    {
        [JsonProperty("product")]
        public ProductResponse Product { get; set; }

        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("totalPrice")]
        public PriceResponse TotalPrice { get; set; }
    }
}
