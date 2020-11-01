using ess_api._4_BL.Services.Responses;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Setting.Responses
{
    public class SettingResponse : ResponseData
    {
        [JsonProperty("maxServicesInDay")]
        public int MaxServicesInDay { get; set; }

        [JsonProperty("maxAvailabilityDays")]
        public int MaxAvailabilityDays { get; set; }
    }
}
