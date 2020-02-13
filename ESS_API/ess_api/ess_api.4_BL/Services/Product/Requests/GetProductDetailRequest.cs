using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class GetProductDetailRequest : Request
    {
        [Required]
        public string ProductId { get; set; }
        [Required]
        public int OrderProductsCount { get; set; }
    }
}
