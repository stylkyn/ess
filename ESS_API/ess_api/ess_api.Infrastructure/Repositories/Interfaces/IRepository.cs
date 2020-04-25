using ess_api.Core.Model;
using ess_api.DAL.Repository;
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
        Task<T> FindAsync(Expression<Func<T, bool>> condition, SortType sortType, Expression<Func<T, object>> sort);
        Task<List<T>> FindManyAsync();
        Task<List<T>> FindManyAsync(Expression<Func<T, bool>> condition, SortType? sortType = null, Expression<Func<T, object>> sort = null);
        Task<(List<T>, int)> FindManyIncludeTotalAsync(Expression<Func<T, bool>> condition, SortType? sortType = null, Expression<Func<T, object>> sort = null, int? skip = null, int? take = null);
        Task<T> InsertAsync(T document);
        Task<IEnumerable<T>> InsertManyAsync(IEnumerable<T> documents);
        Task ReplaceAsync(Guid id, T document);
        Task<T> FindAndReplaceAsync(Guid id, T document);
        Task DeleteAsync(Guid id);
        Task DeleteManyAsync(List<Guid> ids);
    }
}
