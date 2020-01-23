using ess_api.Core.Model;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Requests
{
    public class CategoryRequest : Request
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("parentCategoryId")]
        public string ParentCategoryId { get; set; }
    }
}
