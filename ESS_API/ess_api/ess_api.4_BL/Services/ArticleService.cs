using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services
{
    public class ArticleService : MainService
    {

        /*
         * GET
         * **/
        public async Task<ResponseList<ArticleResponse>> Get()
        {
            var articles = await _uow.Articles.FindManyAsync();
            return new ResponseList<ArticleResponse>(ResponseStatus.Ok, MapArticles(articles.ToList()));
        }

        public async Task<Response<ArticleResponse>> Get(string Id)
        {
            var article = await _uow.Articles.FindAsync(new Guid(Id));
            return new Response<ArticleResponse>(ResponseStatus.Ok, MapArticle(article));
        }

        /*
         *  SET
         * **/
        public async Task<Response> Add(ArticleRequest article)
        {
            await _uow.Articles.InsertAsync(article);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Update(ArticleRequest article)
        {
            await _uow.Articles.ReplaceAsync(article.Id, article);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Remove(string id)
        {
            await _uow.Articles.DeleteAsync(new Guid(id));
            return new Response(ResponseStatus.Ok);
        }

        private ArticleResponse MapArticle(ArticleModel article)
        {
            return new ArticleResponse
            {
                Id = article.Id.ToString(),
                Name = article.Name,
                PreviewDescription = article.PreviewDescription,
                Description = article.Description,
                Price = article.Price,
                CategoryId = article.CategoryId
            };
        }

        private List<ArticleResponse> MapArticles(List<ArticleModel> articles)
        {
            return articles.Select(x => MapArticle(x)).ToList();
        }
    }
}
