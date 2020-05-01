using Newtonsoft.Json;
using System;

namespace Libraries.Authetification.Responses
{
    public class AuthentificationTokenResponse
    {
        [JsonProperty("expiresDate")]
        public DateTime ExpiresDate { get; set; }

        [JsonProperty("jwt")]
        public string Jwt { get; set; }
    }
}
