using ess_api.Core.Model;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Responses
{
    public class ProductResponse : ResponseData
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("urlName")]
        public string UrlName { get; set; }

        [JsonProperty("previewDescription")]
        public string PreviewDescription { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("price")]
        public decimal Price { get; set; }

        [JsonProperty("categoryId")]
        public string CategoryId { get; set; }
    }
}
