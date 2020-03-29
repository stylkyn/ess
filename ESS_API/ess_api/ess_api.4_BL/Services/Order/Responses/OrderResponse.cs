using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Order.Responses
{
    public class OrderResponse : ResponseData
    {
        [JsonProperty("products")]
        public List<ProductResponse> Products { get; set; }
    }
}
