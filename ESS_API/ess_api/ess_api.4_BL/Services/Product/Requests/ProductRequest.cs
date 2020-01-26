using ess_api.Core.Model;

namespace ess_api._4_BL.Services.Requests
{
    public class ProductRequest : Request
    {
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string PreviewDescription { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string CategoryId { get; set; }
    }
}
