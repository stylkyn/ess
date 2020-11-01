using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Product.Requests
{
    public class ProductRequest : Request
    {
        [Guid]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string UrlName { get; set; }

        [Required]
        public string PreviewName { get; set; }

        [Required]
        public Image Image { get; set; }

        [Required]
        public List<Image> Gallery { get; set; }

        [Required]
        public string CategoryId { get; set; }

        public string Description { get; set; }
        public string PreviewDescription { get; set; }

        public ProductType Type { get; set; }
        public BuyRequest Buy { get; set; }
        public ServiceRequest Service { get; set; }
        public DepositRequest Deposit { get; set; }
        public StockRequest Stock { get; set; }
    }

    public class StockRequest
    {
        public int Count { get; set; }
        public int PreOrderDays { get; set; }
    }

    public class ServiceRequest
    {
        public DateTime ServiceDate { get; set; }
        public decimal PriceWithoutVat { get; set; }
    }

    public class DepositRequest
    {
        public decimal PriceWithoutVat { get; set; }
        public decimal DepositValue { get; set; }
    }

    public class BuyRequest
    {
        public decimal PriceWithoutVat { get; set; }
    }
}
