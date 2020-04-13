using ess_api.Core.Model;
using Libraries.Authetification.Responses;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Responses
{
    public class UserResponse : ResponseData
    {

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("personal")]
        public UserPersonalResponse Personal { get; set; }

        [JsonProperty("company")]
        public UserCompanyResponse Company { get; set; }

        [JsonProperty("token")]
        public AuthentificationTokenResponse Token { get; set; }
    }

    public class UserPersonalResponse
    {
        [JsonProperty("firstname")]
        public string Firstname { get; set; }

        [JsonProperty("lastname")]
        public string Lastname { get; set; }


        [JsonProperty("address")]
        public UserAddressResponse Address { get; set; }

        [JsonProperty("contact")]
        public UserContactResponse Contact { get; set; }

    }

    public class UserCompanyResponse
    {
        [JsonProperty("companyName")]
        public string CompanyName { get; set; }
        // DIC
        [JsonProperty("companyVat")]
        public string CompanyVat { get; set; }
        // IC
        [JsonProperty("companyId")]
        public string CompanyId { get; set; }

        [JsonProperty("address")]
        public UserAddressResponse Address { get; set; }
    }

    public class UserAddressResponse
    {
        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("postalCode")]
        public string PostalCode { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("street")]
        public string Street { get; set; }

        [JsonProperty("houseNumber")]
        public string HouseNumber { get; set; }
    }

    public class UserContactResponse
    {
        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
    }
}
