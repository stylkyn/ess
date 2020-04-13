using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Order.Requests
{
    public class GetOrderRequest : Request
    {
        [Guid]
        [Required(AllowEmptyStrings = false)]
        public string OrderId { get; set; }
    }
}