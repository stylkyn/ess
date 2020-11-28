using ess_api._4_BL.Services.Requests;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class TransportForOrderRequest : Request
    {
        [Required]
        public bool HasService { get; set; }
    }
}
