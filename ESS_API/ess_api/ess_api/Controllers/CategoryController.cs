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

        [HttpGet]
        [Route("GetTree")]
        public async Task<IHttpActionResult> GetTree()
        {
            var response = await _categoryService.GetTree();
            return new CreateResult(response);
        }

        public async Task<IHttpActionResult> Get()
        {
            var response = await _categoryService.Get();
            return new CreateResult(response);
        }

        public async Task<IHttpActionResult> Get(string Id)
        {
            var response = await _categoryService.Get(Id);
            return new CreateResult(response);
        }

        [HttpGet]
        [Route("GetByUrl")]
        public async Task<IHttpActionResult> GetByUrl([FromUri] string urlName)
        {
            var response = await _categoryService.GetByUrl(urlName);
            return new CreateResult(response);
        }

        [JwtAuthenticationAdmin]
        [Route("Update")]
        [HttpPut]
        public async Task<IHttpActionResult> Put([FromBody]CategoryRequest Category)
        {
            var response = await _categoryService.Update(Category);
            return new CreateResult(response);
        }

        [Route("Add")]
        [HttpPost]
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
