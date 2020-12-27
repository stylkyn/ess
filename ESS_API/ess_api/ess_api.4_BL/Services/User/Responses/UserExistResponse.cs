using ess_api.Core.Model;
using Libraries.Authetification.Responses;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Responses
{
    public class UserExistResponse : ResponseData
    {

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("userExist")]
        public bool UserExist { get; set; }
    }
}
