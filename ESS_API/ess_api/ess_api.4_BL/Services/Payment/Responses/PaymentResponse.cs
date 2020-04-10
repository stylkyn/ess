using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Payment.Responses
{
    public class PaymentResponse : ResponseData
    {
        [JsonProperty("type")]
        public PaymentType Type { get; set; }

        [JsonProperty("isActive")]
        public bool IsActive { get; set; }


        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("totalPrice")]
        public PriceResponse TotalPrice { get; set; }

        [JsonProperty("cashOnDelivery")]
        public CashOnDeliveryPaymentResponse CashOnDelivery { get; set; }

        [JsonProperty("paymentOrder")]
        public PaymentOrderResponse PaymentOrder { get; set; }
    }

    public class CashOnDeliveryPaymentResponse
    {
    }

    public class PaymentOrderResponse
    {
    }
}
