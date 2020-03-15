using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
