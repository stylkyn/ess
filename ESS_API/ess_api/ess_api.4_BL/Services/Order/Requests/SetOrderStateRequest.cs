using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Order.Requests
{
    public class SetOrderStateRequest : Request
    {
        [Guid]
        [Required(AllowEmptyStrings = false)]
        public string OrderId { get; set; }

        [Required]
        public OrderState State { get; set; }
    }
}