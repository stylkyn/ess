using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Routing;

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

        // GET: api/categories
        public IHttpActionResult Get()
        {
            List<CategoryResponse> categories = _categoryService.Get();
            if (categories == null)
            {
                return NotFound();
            }

            return Ok(categories);
        }

        // GET: api/categories/5
        public IHttpActionResult Get(string Id)
        {
            CategoryResponse Category = _categoryService.Get(Id);
            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);
        }

        // PUT: api/categories/5
        public IHttpActionResult Put(int Id, [FromBody]CategoryRequest Category)
        {
            try
            {
                _categoryService.Update(Category);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }

        }

        // POST: api/categories
        public IHttpActionResult Post([FromBody]CategoryRequest Category)
        {
            try
            {
                _categoryService.Add(Category);
                return Ok(Category.Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }

        // DELETE: api/categories/5
        public IHttpActionResult Delete(string Id)
        {
            try
            {
                _categoryService.Remove(Id);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }
    }
}
