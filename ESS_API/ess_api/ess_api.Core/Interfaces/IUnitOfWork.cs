using System;

namespace ess_api.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IArticleRepository Articles { get; }
        ILanguageRepository Languages { get; }
        ICategoryRepository Categories { get; }
        IUserRepository Users { get; }
        int Complete();
    }
}
