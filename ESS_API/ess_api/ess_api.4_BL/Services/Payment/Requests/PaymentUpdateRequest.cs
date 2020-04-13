using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class PaymentUpdateRequest : Request
    {
        [Required]
        [Guid]
        public string Id { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public CashOnDeliveryPaymentUpdateRequest CashOnDelivery { get; set; }
        public PaymentOrderUpdateRequest PaymentOrder { get; set; }
    }

    public class CashOnDeliveryPaymentUpdateRequest
    {
    }

    public class PaymentOrderUpdateRequest
    {
    }
}
