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

        public async Task<List<T>> FindManyAsync(Expression<Func<T, bool>> condition)
        {
            return await Collection().Find(condition).ToListAsync();
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
            await Collection().ReplaceOneAsync(x => x.Id == id, document);
        }

        public async Task<T> FindAndReplaceAsync(Guid id, T document)
        {
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
}