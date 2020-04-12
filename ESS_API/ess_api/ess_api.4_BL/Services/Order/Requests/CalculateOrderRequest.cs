using ess_api._4_BL.Services.Requests;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Order.Requests
{
    public class CalculateOrderRequest : Request
    {
        [Required]
        public List<CalculatedOrderProductRequest> Products { get; set; }

        public string TransportId { get; set; }
        public string PaymentId { get; set; }
    }

    public class CalculatedOrderProductRequest
    {
        public string ProductId { get; set; }
        public int Count { get; set; }
    }
}
