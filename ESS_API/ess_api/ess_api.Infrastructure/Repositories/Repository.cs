using ess_api.Core.Interface;
using ess_api.Core.Model;
using ess_api.DAL;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ess_api.DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {
        protected readonly DBContext _db;

        public Repository(DBContext db)
        {
            _db = db;
        }

        public IMongoCollection<T> Collection()
        {
            return MongoDB._db.GetCollection<T>(typeof(T).Name);
        }

        /**
         *  ASYNC
         */

        public async Task<T> FindAsync(Guid Id)
        {
            return await Collection().Find(x => x.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<T> FindAsync(Expression<Func<T, bool>> condition, SortType sortType, Expression<Func<T, object>> sort)
        {
            if (SortType.ASC == sortType)
            {
                return await Collection().Find(condition).SortBy(sort).FirstOrDefaultAsync();
            }
            return await Collection().Find(condition).SortByDescending(sort).FirstOrDefaultAsync();
        }

        public async Task<List<T>> FindManyAsync(Expression<Func<T, bool>> condition, SortType? sortType = null, Expression<Func<T, object>> sort = null)
        {
            var query = Collection().Find(condition);

            if (sortType != null && sort != null)
            {
                if (SortType.ASC == sortType)
                    query = query.SortBy(sort);
                else if (SortType.DESC == sortType)
                    query = query.SortByDescending(sort);
            }
            return await query.ToListAsync();
        }

        public async Task<(List<T>, int)> FindManyIncludeTotalAsync(Expression<Func<T, bool>> condition, SortType? sortType = null, Expression<Func<T, object>> sort = null, int? skip = null, int? take = null)
        {
            var query = Collection().Find(condition);

            if (sortType != null && sort != null)
            {
                if (SortType.ASC == sortType)
                    query = query.SortBy(sort);
                else if (SortType.DESC == sortType)
                    query = query.SortByDescending(sort);
            }
            var totalTask = query.CountDocumentsAsync();
            
            if (skip != null)
                query = query.Skip(skip);
            if (take != null)
                query = query.Limit(take);

            var queryTask = query.ToListAsync();
            await Task.WhenAll(queryTask, totalTask);

            return (queryTask.Result, (int)totalTask.Result);
        }

        public async Task<List<T>> FindManyAsync()
        {
            return await Collection().Find(_ => true).ToListAsync();
        }


        // INSERT ASYNC

        public async Task<T> InsertAsync(T document)
        {

            await Collection().InsertOneAsync(document, null);
            return document;
        }

        public async Task<IEnumerable<T>> InsertManyAsync(IEnumerable<T> documents)
        {
            await Collection().InsertManyAsync(documents, null);
            return documents;
        }

        // UPDATE ASYNC

        public async Task ReplaceAsync(Guid id, T document)
        {
            document.LastModified = DateTime.Now;
            await Collection().ReplaceOneAsync(x => x.Id == id, document);
        }

        public async Task<T> FindAndReplaceAsync(Guid id, T document)
        {
            document.LastModified = DateTime.Now;
            return await Collection().FindOneAndReplaceAsync<T>(
                x => x.Id == id,
                document,
                new FindOneAndReplaceOptions<T, T> { ReturnDocument = ReturnDocument.After });
        }

        public async Task DeleteAsync(Guid id)
        {
            await Collection().DeleteOneAsync(x => x.Id == id);
        }

        public async Task DeleteManyAsync(List<Guid> ids)
        {
            await Collection().DeleteManyAsync(x => ids.Contains(x.Id));
        }

    }

    public enum SortType
    {
        ASC,
        DESC
    }
}