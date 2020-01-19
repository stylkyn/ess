using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    [RoutePrefix("api/articles")]
    public class ArticlesController : BaseApiController
    {
        private ArticleService _as;

        public ArticlesController()
        {
            _as = new ArticleService();
        }

        // GET: api/Articles
        public IHttpActionResult Get()
        {
            List<ArticleResponse> articles = _as.Get();
            if (articles == null)
            {
                return NotFound();
            }

            return Ok(articles);
        }

        // GET: api/Articles/5
        public IHttpActionResult Get(string Id)
        {
            ArticleResponse article = _as.Get(Id);
            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }

        // PUT: api/Articles/5
        public IHttpActionResult Put(int Id, [FromBody]ArticleRequest article)
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
        public IHttpActionResult Post([FromBody]ArticleRequest article)
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
        public IHttpActionResult Delete(string Id)
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