using ess_api._4_BL.Services.Requests;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Payment.Requests
{
    public class PaymentSearchRequest : Request
    {
        public bool OnlyActive { get; set; }
    }
}
