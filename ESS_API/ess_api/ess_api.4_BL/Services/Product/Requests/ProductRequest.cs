using ess_api.Core.Model;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class ProductRequest : Request
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string UrlName { get; set; }

        [Required]
        public string PreviewName { get; set; }

        [Required]
        public string PreviewImageUrl { get; set; }

        [Required]
        public List<string> Gallery { get; set; }

        [Required]
        public string CategoryId { get; set; }

        public string Description { get; set; }
        public string PreviewDescription { get; set; }
        public DepositRequest Deposit { get; set; }
        public BuyRequest Buy { get; set; }

    }

    public class DepositRequest
    {
        public decimal PriceWithouVat { get; set; }
        public decimal DepositValue { get; set; }
    }

    public class BuyRequest
    {
        public decimal PriceWithouVat { get; set; }
    }
}
