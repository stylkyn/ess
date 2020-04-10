using ess_api._4_BL.Services.Requests;
using ess_api.Core.Model;
using System.Collections.Generic;
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
        public string Description { get; set; }

        public PersonalPickupTransportAddRequest PersonalPickup { get; set; }
        public CzechPostTransportAddRequest CzechPost { get; set; }
        public ZasilkovnaTransportAddRequest Zasilkovna { get; set; }
    }

    public class PersonalPickupTransportAddRequest
    {
    }
    
    public class CzechPostTransportAddRequest
    {
        [Required]
        public List<CzechPostTransportOptionAddRequest> Places { get; set; }
    }

    public class CzechPostTransportOptionAddRequest
    {
        [Required]
        public string Name { get; set; }
    }

    public class ZasilkovnaTransportAddRequest
    {
    }
}
