using ess_api.Core.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ess_api.Core.Interface
{
    public interface IRepository<T> where T : BaseModel
    {
        Task<T> FindAsync(Guid Id);
        Task<List<T>> FindManyAsync(Expression<Func<T, bool>> condition);
        Task<List<T>> FindManyAsync();
        Task InsertAsync(T document);
        Task InsertManyAsync(IEnumerable<T> documents);
        Task ReplaceAsync(Guid id, T document);
        Task<T> FindAndReplaceAsync(Guid id, T document);
        Task DeleteAsync(Guid id);
        Task DeleteManyAsync(List<Guid> ids);
    }
}
