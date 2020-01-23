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
        T Find(Guid Id);
        IEnumerable<T> FindMany(Expression<Func<T, bool>> condition);
        IEnumerable<T> FindMany();
        void Insert(T document);
        void InsertMany(IEnumerable<T> documents);
        long Replace(Guid id, T document);
        T FindAndReplace(Guid id, T document);
        long Delete(Guid id);
        long DeleteMany(List<Guid> ids);

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
