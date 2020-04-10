using ess_api._4_BL.Services.Requests;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class PaymentAddRequest : Request
    {
        [Required]
        public PaymentType Type { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public CashOnDeliveryPaymentAddRequest CashOnDelivery { get; set; }
        public PaymentOrderAddRequest PaymentOrder { get; set; }
    }

    public class CashOnDeliveryPaymentAddRequest
    {
    }

    public class PaymentOrderAddRequest
    {
    }
}
