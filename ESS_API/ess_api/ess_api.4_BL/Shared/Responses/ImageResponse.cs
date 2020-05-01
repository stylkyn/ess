using ess_api.Core.Model;
using Newtonsoft.Json;

namespace ess_api._4_BL.Shared.Responses
{
    public class ImageResponse
    {
        [JsonProperty("publicId")]
        public string PublicId { get; set; }

        [JsonProperty("secureUrl")]
        public string SecureUrl { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("originalFileName")]
        public string OriginalFileName { get; set; }
    }
}
