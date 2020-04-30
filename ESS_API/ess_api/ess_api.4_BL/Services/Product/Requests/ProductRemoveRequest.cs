using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using System;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Product.Requests
{
    public class ProductRemoveRequest : Request
    {
        [Required]
        [Guid]
        public string Id { get; set; }
    }
}
