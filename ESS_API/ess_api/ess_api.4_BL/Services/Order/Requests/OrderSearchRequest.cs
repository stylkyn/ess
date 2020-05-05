using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Product.Requests
{
    public class OrderSearchRequest : Request
    {
        [Guid]
        public string UserId { get; set; }

        public OrderState? OrderState { get; set; }
        public PaymentState? PaymentState { get; set; }
        public string FullText { get; set; }

        [Required]
        public int PageSize { get; set; }

        [Required]
        public int PageNumber { get; set; }
    }
}
