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
        [JsonProperty("state")]
        public OrderState State { get; set; }

        [JsonProperty("orderNumber")]
        public long OrderNumber { get; set; }

        [JsonProperty("orderNumberFormatted")]
        public string OrderNumberFormatted { get; set; }

        [JsonProperty("customer")]
        public OrderCustomerResponse Customer { get; set; }

        [JsonProperty("transport")]
        public OrderTransportResponse Transport { get; set; }

        [JsonProperty("payment")]
        public OrderPaymentResponse Payment { get; set; }

        [JsonProperty("calculatedData")]
        public CalculatedOrderResponse CalculatedData { get; set; }
    }

    public class OrderTransportResponse
    {
        [JsonProperty("transportId")]
        public string TransportId { get; set; }

        [JsonProperty("personalPickup")]
        public OrderPersonalPickupTransportResponse PersonalPickup { get; set; }

        [JsonProperty("czechPost")]
        public OrderCzechPostTransportResponse CzechPost { get; set; }

        [JsonProperty("zasilkovna")]
        public OrderZasilkovnaTransportResponse Zasilkovna { get; set; }

        [JsonProperty("sourceData")]
        public TransportResponse SourceData { get; set; }
    }

    public class OrderPersonalPickupTransportResponse
    {
    }

    public class OrderCzechPostTransportResponse
    {
    }
    public class OrderZasilkovnaTransportResponse
    {
    }


    public class OrderPaymentResponse
    {
        [JsonProperty("paymentId")]
        public string PaymentId { get; set; }

        [JsonProperty("state")]
        public PaymentState State { get; set; } = PaymentState.NotPaid;

        [JsonProperty("paymentOrder")]
        public OrderPaymentOrderResponse PaymentOrder { get; set; }

        [JsonProperty("orderCashOnDelivery")]
        public OrderCashOnDeliveryRespoonse OrderCashOnDelivery { get; set; }

        [JsonProperty("sourceData")]
        public PaymentResponse SourceData { get; set; }
    }
    public class OrderPaymentOrderResponse
    {
    }

    public class OrderCashOnDeliveryRespoonse
    {
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
