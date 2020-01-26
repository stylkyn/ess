using ess_api.Core.Model;

namespace ess_api._4_BL.Services.Requests
{
    public class ProductSearchRequest : Request
    {
        public string CategoryId { get; set; } = default;
        public string CategoryUrlName { get; set; } = default;
    }
}
