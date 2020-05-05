using ess_api.Core.Model;
using Libraries.Authetification.Responses;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Responses
{
    public class UserOptionResponse : ResponseData
    {

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
    }
}
