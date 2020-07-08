using Newtonsoft.Json;
namespace Libraries.Mailing.Model
{
    public class TransactionalEmailRequest
    {
        [JsonProperty("contentData")]
        public object ContentData { get; set; }
        [JsonProperty("sender")]
        public Sender Sender { get; set; }
    }

    public class Sender
    {
        [JsonProperty("name")]
        public string CompanyName { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("zip")]
        public string Zip { get; set; }

    }
}
