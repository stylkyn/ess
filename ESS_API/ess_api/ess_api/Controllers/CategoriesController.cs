using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Categories")]
    public class CategoriesController : BaseApiController
    {
        private CategoryService _categoryService;

        public CategoriesController()
        {
            _categoryService = new CategoryService();
        }

        // GET: api/categories/GetTree
        [HttpGet]
        [Route("GetTree")]
        public async Task<IHttpActionResult> GetTree()
        {
            var response = await _categoryService.GetTree();
            return new CreateResult<Response>(response);
        }

        // GET: api/categories
        public async Task<IHttpActionResult> Get()
        {
            List<CategoryResponse> categories = await _categoryService.Get();
            if (categories == null)
            {
                return NotFound();
            }

            return Ok(categories);
        }

        // GET: api/categories/5
        public async Task<IHttpActionResult> Get(string Id)
        {
            CategoryResponse Category = await _categoryService.Get(Id);
            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);
        }

        // PUT: api/categories/5
        public async Task<IHttpActionResult> Put(int Id, [FromBody]CategoryRequest Category)
        {
            try
            {
                await _categoryService.Update(Category);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }

        }

        // POST: api/categories
        public async Task<IHttpActionResult> Post([FromBody]CategoryRequest Category)
        {
            try
            {
                await _categoryService.Add(Category);
                return Ok(Category.Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }

        // DELETE: api/categories/5
        public async Task<IHttpActionResult> Delete(string Id)
        {
            try
            {
                await _categoryService.Remove(Id);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }
    }
}
