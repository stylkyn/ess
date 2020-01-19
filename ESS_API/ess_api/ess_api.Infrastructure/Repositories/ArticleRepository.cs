using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System.Collections.Generic;
using System.Linq;

namespace ess_api.Repository
{
    public class ArticleRepository : Repository<ArticleModel>, IArticleRepository
    {

        public ArticleRepository(DBContext _db) : base(_db) { }
    }
}

