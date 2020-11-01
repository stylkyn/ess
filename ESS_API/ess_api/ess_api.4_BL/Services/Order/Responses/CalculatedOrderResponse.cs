using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Order.Responses
{
    public class CalculatedOrderResponse : ResponseData
    {
        [JsonProperty("products")]
        public List<CalculatedOrderProductResponse> Products { get; set; } = new List<CalculatedOrderProductResponse>();

        [JsonProperty("transport")]
        public CalculatedOrderTransportResponse Transport { get; set; }

        [JsonProperty("payment")]
        public CalculatedOrderPaymentResponse Payment { get; set; }

        [JsonProperty("total")]
        public CalculatedOrderTotalResponse Total { get; set; }
    }
    public class CalculatedOrderTransportResponse
    {
        [JsonProperty("transportId")]
        public string TransportId { get; set; }

        [JsonProperty("type")]
        public TransportType Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("totalPrice")]
        public PriceResponse TotalPrice { get; set; }
    }

    public class CalculatedOrderPaymentResponse
    {
        [JsonProperty("paymentId")]
        public string PaymentId { get; set; }

        [JsonProperty("type")]
        public PaymentType Type { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("totalPrice")]
        public PriceResponse TotalPrice { get; set; }
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

        [JsonProperty("service")]
        public CalculatedOrderProductServiceResponse Service { get; set; }

    }

    public class CalculatedOrderProductServiceResponse
    {
        [JsonProperty("date")]
        public DateTime? Date { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; } // user agent id

        [JsonProperty("done")]
        public bool Done { get; set; }
    }
}
