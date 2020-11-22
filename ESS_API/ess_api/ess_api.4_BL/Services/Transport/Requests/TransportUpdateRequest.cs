using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class TransportUpdateRequest : Request
    {
        [Required]
        [Guid]
        public string Id { get; set; }

        [Required]
        public TransportType Type { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int PriceWithoutVat { get; set; }

        [Required]
        public Image Image { get; set; }

        public string Description { get; set; }
    }
}
