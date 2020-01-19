using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ess_api._4_BL.Services
{
    public class ArticleService : MainService
    {

        /*
         * GET
         * **/
        public List<ArticleResponse> Get()
        {
            return MapArticles(_uow.Articles.FindMany().ToList());
        }

        public ArticleResponse Get(string Id)
        {
            return MapArticle(_uow.Articles.Find(new Guid(Id)));
        }

        /*
         *  SET
         * **/
        public void Add(ArticleRequest article)
        {
            _uow.Articles.Insert(article);
        }

        public void Update(ArticleRequest article)
        {
            _uow.Articles.Replace(article.Id, article);
        }

        public void Remove(string id)
        {
            _uow.Articles.Delete(new Guid(id));
        }

        private ArticleResponse MapArticle(ArticleModel article)
        {
            return (ArticleResponse)article;
        }

        private List<ArticleResponse> MapArticles(List<ArticleModel> articles)
        {
            return articles.Select(x => MapArticle(x)).ToList();
        }
    }
}
