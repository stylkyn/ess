using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Requests;
using ess_api.App_Start.Filters;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Products")]
    public class ProductsController : BaseApiController
    {
        private _4_BL.Services.Product.ProductService _productService;

        public ProductsController()
        {
            _productService = new _4_BL.Services.Product.ProductService();
        }

        [HttpGet]
        [JwtAuthenticationAdmin]
        [Route("GetAll")]
        public async Task<IHttpActionResult> Getall([FromUri] Request request)
        {
            if (request == null)
                request = new Request();
            
            var response = await _productService.GetAll(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [JwtAuthenticationAdmin]
        [Route("SearchExtend")]
        public async Task<IHttpActionResult> SearchExtend([FromUri] ProductSearchExtendRequest request)
        {
            var response = await _productService.SearchExtend(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [Route("Search")]
        public async Task<IHttpActionResult> Search([FromUri] ProductSearchRequest request)
        {
            var response = await _productService.Search(request);
            return new CreateResult(response);
        }

        public async Task<IHttpActionResult> Get([FromUri] GetProductDetailRequest request)
        {
            var response = await _productService.Get(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [RequiredRequest]
        [Route("GetProductAvailabilities")]
        public async Task<IHttpActionResult> GetProductAvailablities([FromUri] ProductAvailabilityRequest request)
        {
            var response = await _productService.GetProductAvailabilities(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [Route("GetByUrl")]
        public async Task<IHttpActionResult> GetByUrl([FromUri] GetProductDetailByUrlRequest request)
        {
            var response = await _productService.GetByUrl(request);
            return new CreateResult(response);
        }

        [JwtAuthenticationAdmin]
        [Route("Update")]
        [HttpPut]
        public async Task<IHttpActionResult> Put([FromBody]ProductRequest Product)
        {
            var response = await _productService.Update(Product);
            return new CreateResult(response);
        }

        [Route("Add")]
        [HttpPost]
        [JwtAuthenticationAdmin]
        public async Task<IHttpActionResult> Post([FromBody]ProductRequest Product)
        {
            var response = await _productService.Add(Product);
            return new CreateResult(response);
        }


        [RequiredRequest]
        [Route("Delete")]
        [JwtAuthenticationAdmin]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete([FromUri]ProductRemoveRequest request)
        {
            var response = await _productService.Remove(request);
            return new CreateResult(response);
        }
    }
}