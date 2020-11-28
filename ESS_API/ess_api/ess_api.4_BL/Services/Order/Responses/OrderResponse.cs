using ess_api._4_BL.Services.Payment.Responses;
using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Services.Transport.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Order.Responses
{
    public class OrderResponse : ResponseData
    {
        [JsonProperty("createdDate")]
        public DateTime CreatedDate { get; set; }

        [JsonProperty("lastModified")]
        public DateTime LastModified { get; set; }

        [JsonProperty("paymentState")]
        public PaymentState PaymentState { get; set; }

        [JsonProperty("state")]
        public OrderState State { get; set; }

        [JsonProperty("orderNumber")]
        public long OrderNumber { get; set; }

        [JsonProperty("orderNumberFormatted")]
        public string OrderNumberFormatted { get; set; }

        [JsonProperty("customer")]
        public OrderCustomerResponse Customer { get; set; }

        [JsonProperty("calculatedData")]
        public CalculatedOrderResponse CalculatedData { get; set; }
    }

    public class OrderCustomerResponse
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("personal")]
        public UserPersonalResponse Personal { get; set; }

        [JsonProperty("company")]
        public UserCompanyResponse Company { get; set; }
    }
}
