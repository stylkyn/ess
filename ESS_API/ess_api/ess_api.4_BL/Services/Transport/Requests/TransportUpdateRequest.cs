using ess_api._4_BL.Services.Requests;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class TransportUpdateRequest : Request
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public PersonalPickupTransportUpdateRequest PersonalPickup { get; set; }
        public CzechPostTransportUpdateRequest CzechPost { get; set; }
        public ZasilkovnaTransportUpdateRequest Zasilkovna { get; set; }
    }

    public class PersonalPickupTransportUpdateRequest
    {
    }
    
    public class CzechPostTransportUpdateRequest
    {
        public List<CzechPostTransportOptionUpdateRequest> Places { get; set; }
    }

    public class CzechPostTransportOptionUpdateRequest
    {
        public string Name { get; set; }
    }

    public class ZasilkovnaTransportUpdateRequest
    {
    }
}
