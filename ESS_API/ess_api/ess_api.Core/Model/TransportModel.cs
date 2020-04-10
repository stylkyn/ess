using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class TransportModel : BaseModel
    {
        public TransportType Type { get; set; }
        // is visible for customers
        public bool IsActive { get; set; } = true;
        public string Name { get; set; }
        public string Description { get; set; }
        public Price TotalPrice { get; set; } = new Price(0.0M);
        public PersonalPickupTransport PersonalPickup { get; set; }
        public CzechPostTransport CzechPost { get; set; }
        public ZasilkovnaTransport Zasilkovna { get; set; }
    }

    // Osobni vyzvednuti
    public class PersonalPickupTransport
    {
    }

    // Ceska Posta
    public class CzechPostTransport
    {
        public List<CzechPostTransportOption> Places { get; set; }
    }

    public class CzechPostTransportOption
    {
        public string Name { get; set; }
    }

    public class ZasilkovnaTransport
    {
    }

    public enum TransportType
    {
        PersonalPickup,
        CzechPost,
        Zasilkovna
    }
}
