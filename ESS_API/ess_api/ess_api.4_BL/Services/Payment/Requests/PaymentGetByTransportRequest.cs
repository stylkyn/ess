using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Payment.Requests
{
    public class PaymentGetByTransportRequest : Request
    {
        [Guid]
        [Required]
        public string TransportId { get; set; }

        [Required]
        public bool HasService { get; set; }
    }
}
