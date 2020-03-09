using ess_api.Core.Model;
using Libraries.Authetification.Responses;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Responses
{
    public class UserResponse : ResponseData
    {
        [JsonProperty("firstname")]
        public string Firstname { get; set; }

        [JsonProperty("lastname")]
        public string Lastname { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("token")]
        public AuthentificationTokenResponse Token { get; set; }
    }
}
