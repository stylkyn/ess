using ess_api.Core.Interface;
using ess_api.Core.Model;
using ess_api.DAL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace ess_api.Repository
{
    public class RepositorySettings
    {
        public static string language_code { get; set; } = "cs";

    }
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly EssContext _db;

        public Repository(EssContext dataContext)
        {
            _db = dataContext;
        }

        IEnumerable<TEntity> IRepository<TEntity>.GetAll()
        {
            return DbSet.ToList();
        }

        TEntity IRepository<TEntity>.Find(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.Find(predicate);
        }

        TEntity IRepository<TEntity>.Find(int Id)
        {
            return DbSet.Find(Id);
        }

        void IRepository<TEntity>.Add(TEntity entity)
        {
            DbSet.Add(entity);
        }

        void IRepository<TEntity>.AddRange(IEnumerable<TEntity> entities)
        {
            DbSet.AddRange(entities);
        }

        void IRepository<TEntity>.Remove(TEntity entity)
        {
            DbSet.Remove(entity);
        }

        void IRepository<TEntity>.RemoveRange(IEnumerable<TEntity> entities)
        {
            DbSet.RemoveRange(entities);
        }

        void IRepository<TEntity>.Update(TEntity entity)
        {
            _db.Entry(entity).State = EntityState.Modified;
        }
        // Multijazycnost - vyhlednai hodnoty dle klice
        protected string Lan(string key)
        {
            language lan = _db.languages.Where(l => l.code == RepositorySettings.language_code).FirstOrDefault();
            long language_id;

            if (lan == null) language_id = 1;
            else language_id = lan.Id;

            var v = _db.translations.Where(t => t.key == key && t.language_Id == language_id);
            if (v.Count() == 0)
                return null;
            else
                return v.First().text;
        }

        // internal method for Syntax sugar
        private DbSet<TEntity> DbSet
        {
            get { return _db.Set<TEntity>(); }
        }
    }
}