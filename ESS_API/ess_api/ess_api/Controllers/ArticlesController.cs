using ess_api._4_BL.Services;
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
    [RoutePrefix("api/articles")]
    public class ArticlesController : BaseApiController
    {
        private ArticleService _articleService;

        public ArticlesController()
        {
            _articleService = new ArticleService();
        }

        // GET: api/Articles
        public async Task<IHttpActionResult> Get()
        {
            var response = await _articleService.Get();
            return new CreateResult(response);
        }

        // GET: api/Articles/5
        public async Task<IHttpActionResult> Get(string Id)
        {
            var response = await _articleService.Get(Id);
            return new CreateResult(response);
        }

        // PUT: api/Articles/5
        public async Task<IHttpActionResult> Put(int Id, [FromBody]ArticleRequest article)
        {
            var response = await _articleService.Update(article);
            return new CreateResult(response);
        }

        // POST: api/Articles
        public async Task<IHttpActionResult> Post([FromBody]ArticleRequest article)
        {
            var response = await _articleService.Add(article);
            return new CreateResult(response);
        }

        // DELETE: api/Articles/5
        public async Task<IHttpActionResult> Delete(string Id)
        {
            var response = await _articleService.Remove(Id);
            return new CreateResult(response);
        }
    }
}