using ess_api._4_BL.Services.Requests;

namespace ess_api._4_BL.Services.Setting.Requests
{
    public class UpdateSettingRequest : Request
    {
        public int MaxServicesInDay { get; set; }
        public int MaxAvailabilityDays { get; set; }
    }
}
