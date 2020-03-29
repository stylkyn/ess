using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Product;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Products")]
    public class ProductsController : BaseApiController
    {
        private ProductService _productService;

        public ProductsController()
        {
            _productService = new ProductService();
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
        [Route("GetByUrl")]
        public async Task<IHttpActionResult> GetByUrl([FromUri] GetProductDetailByUrlRequest request)
        {
            var response = await _productService.GetByUrl(request);
            return new CreateResult(response);
        }

        [HttpPut]
        public async Task<IHttpActionResult> Put([FromBody]ProductRequest Product)
        {
            var response = await _productService.Update(Product);
            return new CreateResult(response);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]ProductRequest Product)
        {
            var response = await _productService.Add(Product);
            return new CreateResult(response);
        }

        [HttpDelete]
        public async Task<IHttpActionResult> Delete(string Id)
        {
            var response = await _productService.Remove(Id);
            return new CreateResult(response);
        }
    }
}