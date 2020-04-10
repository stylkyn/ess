using ess_api._4_BL.Services.Requests;

namespace ess_api._4_BL.Services.Transport.Requests
{
    public class TransportSearchRequest : Request
    {
        public bool OnlyActive { get; set; }
    }
}
