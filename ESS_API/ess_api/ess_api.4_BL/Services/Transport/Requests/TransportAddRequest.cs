using ess_api._4_BL.Services.Requests;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class TransportAddRequest : Request
    {
        [Required]
        public TransportType Type { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public Image Image { get; set; }

        [Required]
        public decimal PriceWithoutVat { get; set; }

        public string Description { get; set; }
    }
}
