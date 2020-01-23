using ess_api.Core.Model;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Responses
{
    public class ResponseData
    {
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
