using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Product.Requests
{
    public class ProductAvailabilityRequest : Request
    {
        [Required]
        [Guid]
        public string ProductId { get; set; }
    }
}
