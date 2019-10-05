using ess_api.Core.Model;
using System.Collections.Generic;

namespace ess_api._4_BL.Services
{
    public class ArticleService : MainService
    {

        /*
         * GET
         * **/
        public IEnumerable<article> Get()
        {
            return _uow.Articles.GetAll();
        }

        public article Get(int Id)
        {
            return _uow.Articles.Find(Id);
        }

        /*
         *  SET
         * **/
        public void Add(article article)
        {
            _uow.Articles.Add(article);
            _uow.Complete();
        }

        public void Update(article article)
        {
            _uow.Articles.Update(article);
            _uow.Complete();
        }

        public void Remove(int Id)
        {
            article article = Get(Id);
            _uow.Articles.Remove(article);
            _uow.Complete();
        }

        public void RemoveRange(IEnumerable<article> articles)
        {
            _uow.Articles.RemoveRange(articles);
            _uow.Complete();
        }
    }
}
