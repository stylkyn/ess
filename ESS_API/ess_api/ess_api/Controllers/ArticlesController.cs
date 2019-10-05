using ess_api._4_BL.Services;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    public class ArticlesController : BaseApiController
    {
        private ArticleService _as;

        public ArticlesController()
        {
            _as = new ArticleService();
        }

        // GET: api/Articles
        [ResponseType(typeof(IEnumerable<article>))]
        public IHttpActionResult Get()
        {
            IEnumerable<article> articles = _as.Get();
            if (articles == null)
            {
                return NotFound();
            }

            return Ok(articles);
        }

        // GET: api/Articles/5
        [ResponseType(typeof(article))]
        public IHttpActionResult Get(int Id)
        {
            article article = _as.Get(Id);
            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        // PUT: api/Articles/5
        [ResponseType(typeof(int))]
        public IHttpActionResult Put(int Id, [FromBody]article article)
        {
            try
            {
                _as.Update(article);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }

        }

        // POST: api/Articles
        [ResponseType(typeof(article))]
        public IHttpActionResult Post([FromBody]article article)
        {
            try
            {
                _as.Add(article);
                return Ok(article.Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }

        // DELETE: api/Articles/5
        [ResponseType(typeof(article))]
        public IHttpActionResult Delete(int Id)
        {
            try
            {
                _as.Remove(Id);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }
    }
}