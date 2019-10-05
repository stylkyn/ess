using ess_api._4_BL.Services;
using ess_api.Core.LanguageModel;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Routing;

namespace ess_api.Controllers
{
    [RoutePrefix("api/{lang}/Categories")]
    public class CategoriesController : BaseApiController
    {
        private CategoryService _cs;

        public CategoriesController()
        {
            _cs = new CategoryService();
        }

        // GET: api/categories
        [ResponseType(typeof(IEnumerable<category>))]
        public IHttpActionResult Get()
        {
            IEnumerable<category> categories = _cs.Get();
            if (categories == null)
            {
                return NotFound();
            }

            return Ok(categories);
        }

        // GET: api/categories/5
        [ResponseType(typeof(category))]
        public IHttpActionResult Get(int Id)
        {
            category Category = _cs.Get(Id);
            if (Category == null)
            {
                return NotFound();
            }

            return Ok(Category);
        }

        // GET: api/Categories
        [ResponseType(typeof(IEnumerable<CategoryLan>))]
        [Route("GetLan")]
        public IHttpActionResult GetLan()
        {

            IEnumerable<CategoryLan> categories = _cs.GetLan();
            if (categories == null)
            {
                return NotFound();
            }

            return Ok(categories);
        }

        // PUT: api/categories/5
        [ResponseType(typeof(int))]
        public IHttpActionResult Put(int Id, [FromBody]category Category)
        {
            try
            {
                _cs.Update(Category);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }

        }

        // POST: api/categories
        [ResponseType(typeof(category))]
        public IHttpActionResult Post([FromBody]category Category)
        {
            try
            {
                _cs.Add(Category);
                return Ok(Category.Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }

        // DELETE: api/categories/5
        [ResponseType(typeof(category))]
        public IHttpActionResult Delete(int Id)
        {
            try
            {
                _cs.Remove(Id);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }
    }
}
