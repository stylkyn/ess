using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using System.Collections.Generic;
using System.Linq;

namespace ess_api.Repository
{
    public class ArticleRepository : Repository<article>, IArticleRepository
    {

        public ArticleRepository(EssContext _db) : base(_db) { }

        // get article descesing
        public IEnumerable<article> getArticleDescesing()
        {
            return _db.articles.OrderByDescending(a => a.Id).ToList();
        }
    }
}

