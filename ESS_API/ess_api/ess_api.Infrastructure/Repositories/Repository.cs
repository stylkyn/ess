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
    public class RepositorySettings
    {
        public static string language_code { get; set; } = "cs";

    }
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
         *  SYNC
         */

        public T Find(Guid Id)
        {
            return Collection().Find(x => x.Id == Id).FirstOrDefault();
        }

        // GET

        public IEnumerable<T> FindMany(Expression<Func<T, bool>> condition)
        {
            return Collection().AsQueryable().Where(condition);
        }


        public IEnumerable<T> FindMany()
        {
            return Collection().AsQueryable();
        }


        // INSERT

        public void Insert(T document)
        {
            Collection().InsertOne(document, null);
        }

        public void InsertMany(IEnumerable<T> documents)
        {
            Collection().InsertMany(documents, null);
        }

        // UPDATE

        public long Replace(Guid id, T document)
        {
            return Collection().ReplaceOne(x => x.Id == id, document).ModifiedCount;
        }

        public T FindAndReplace(Guid id, T document)
        {
            return Collection().FindOneAndReplace<T>(
                x => x.Id == id,
                document, 
                new FindOneAndReplaceOptions<T, T> { ReturnDocument = ReturnDocument.After });
        }

        // REMOVE

        public long Delete(Guid id)
        {
            return Collection().DeleteOne(x => x.Id == id).DeletedCount;
        }

        public long DeleteMany(List<Guid> ids)
        {
            return Collection().DeleteMany(x => ids.Contains(x.Id)).DeletedCount;
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

        public async Task InsertAsync(T document)
        {
            await Collection().InsertOneAsync(document, null);
        }

        public async Task InsertManyAsync(IEnumerable<T> documents)
        {
            await Collection().InsertManyAsync(documents, null);
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