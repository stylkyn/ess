﻿using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Product.Requests
{
    public class GetProductDetailRequest : Request
    {
        [Required]
        [Guid]
        public string ProductId { get; set; }
        [Required]
        public int OrderProductsCount { get; set; }
    }
}
