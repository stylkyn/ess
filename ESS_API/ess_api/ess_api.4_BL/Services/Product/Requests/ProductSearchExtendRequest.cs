using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Product.Requests
{
    public class ProductSearchExtendRequest : Request
    {
        [Guid]
        public string CategoryId { get; set; }
        public string FullText { get; set; }

        [Required]
        public int PageSize { get; set; }

        [Required]
        public int PageNumber { get; set; }
    }
}
