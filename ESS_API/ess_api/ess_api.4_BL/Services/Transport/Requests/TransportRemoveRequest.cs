using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using System;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class TransportRemoveRequest : Request
    {
        [Required]
        [Guid]
        public string Id { get; set; }
    }
}
