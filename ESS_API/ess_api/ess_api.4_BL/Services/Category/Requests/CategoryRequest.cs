using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using Newtonsoft.Json;

namespace ess_api._4_BL.Services.Requests
{
    public class CategoryRequest : Request
    {
        [Guid]
        public string Id { get; set; }
        public string Name { get; set; }
        public string UrlName { get; set; }
        public bool IsActive { get; set; }
        public Image Image { get; set; }
        public string ParentCategoryId { get; set; }
    }
}
