using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;

namespace ess_api._4_BL.Services.Product.Requests
{
    public class ProductSearchRequest : Request
    {
        [Guid]
        public string CategoryId { get; set; } = default;
        public string CategoryUrlName { get; set; } = default;
    }
}
