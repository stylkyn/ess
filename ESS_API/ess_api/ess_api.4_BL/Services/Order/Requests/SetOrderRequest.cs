using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Order.Requests
{
    public class SetOrderRequest : Request
    {
        public OrderCustomerRequest Customer { get; set; }
        public OrderTransportRequest Transport { get; set; }
        public OrderPaymentRequest Payment { get; set; }
        public CalculateOrderRequest CalculateOrder { get; set; }
    }

    public class OrderCustomerRequest
    {
        [Required]
        public UserPersonalRequest Personal { get; set; }
        public UserCompanyRequest Company { get; set; }
    }

    public class OrderTransportRequest
    {
        [Required]
        [Guid]
        public string TransportId { get; set; }
    }

    public class OrderPaymentRequest
    {
        [Required]
        [Guid]
        public string PaymentId { get; set; }
    }
}
