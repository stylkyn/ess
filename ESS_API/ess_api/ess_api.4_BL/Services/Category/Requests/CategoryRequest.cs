using ess_api.Core.Model;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Requests
{
    public class CategoryRequest : Request
    {
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string ParentCategoryId { get; set; }
    }
}
