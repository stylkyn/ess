using ess_api.Core.Interfaces;
using ess_api.Infrastructure.Repositories;
using ess_api.Repository;

namespace ess_api.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EssContext _db;

        public IArticleRepository Articles { get; private set; }
        public ILanguageRepository Languages { get; private set; }
        public ICategoryRepository Categories { get; private set; }
        public IUserRepository Users { get; private set; }


        public UnitOfWork(EssContext db)
        {
            _db = db;
            Articles = new ArticleRepository(_db);
            Languages = new LanguageRepository(_db);
            Categories = new CategoryRepository(_db);
            Users = new UserRepository(_db);
        }

        public int Complete()
        {
            return _db.SaveChanges();
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
