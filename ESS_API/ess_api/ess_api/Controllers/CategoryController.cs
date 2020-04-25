using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.App_Start.Filters;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Categories")]
    public class CategoryController : BaseApiController
    {
        private readonly CategoryService _categoryService;

        public CategoryController()
        {
            _categoryService = new CategoryService();
        }

        [RequiredRequest]
        [JwtAuthenticationAdmin]
        [Route("Search")]
        [HttpGet]
        public async Task<IHttpActionResult> Search([FromUri] CategorySearchRequest request)
        {
            var response = await _categoryService.Search(request);
            return new CreateResult(response);
        }

        // GET: api/categories/GetTree
        [HttpGet]
        [Route("GetTree")]
        public async Task<IHttpActionResult> GetTree()
        {
            var response = await _categoryService.GetTree();
            return new CreateResult(response);
        }

        // GET: api/categories
        public async Task<IHttpActionResult> Get()
        {
            var response = await _categoryService.Get();
            return new CreateResult(response);
        }

        // GET: api/categories/5
        public async Task<IHttpActionResult> Get(string Id)
        {
            var response = await _categoryService.Get(Id);
            return new CreateResult(response);
        }

        // GET: api/categories/GetByUrl
        [HttpGet]
        [Route("GetByUrl")]
        public async Task<IHttpActionResult> GetByUrl([FromUri] string urlName)
        {
            var response = await _categoryService.GetByUrl(urlName);
            return new CreateResult(response);
        }

        // PUT: api/categories/5
        [JwtAuthenticationAdmin]
        public async Task<IHttpActionResult> Put(int Id, [FromBody]CategoryRequest Category)
        {
            var response = await _categoryService.Update(Category);
            return new CreateResult(response);
        }

        // POST: api/categories
        [JwtAuthenticationAdmin]
        public async Task<IHttpActionResult> Post([FromBody]CategoryRequest Category)
        {
            var response = await _categoryService.Add(Category);
            return new CreateResult(response);

        }

        [Route("Delete")]
        [JwtAuthenticationAdmin]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete([FromUri]CategoryRemoveRequest request)
        {
            var response = await _categoryService.Remove(request);
            return new CreateResult(response);
        }

    }
}
