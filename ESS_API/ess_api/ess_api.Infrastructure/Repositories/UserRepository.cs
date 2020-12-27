using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ess_api.Infrastructure.Repositories
{
    public class UserRepository : Repository<UserModel>, IUserRepository
    {
        public UserRepository(DBContext _db) : base(_db) { }

        public async Task<(List<UserModel>, int)> SearchUser(string fullText, int skip, int take, SortType? sortType, UserSortField? sortField)
        {
            if (sortType == null)
                sortType = SortType.DESC;
            Expression<Func<UserModel, object>> sortFunc = x => x.CreatedDate;
            switch(sortField)
            {
                case UserSortField.Email:
                    sortFunc = x => x.Email; break;
                case UserSortField.Lastname:
                    sortFunc = x => x.Personal.Lastname; break;
                case UserSortField.Firstname:
                    sortFunc = x => x.Personal.Firstname; break;
                case UserSortField.CompanyName:
                    sortFunc = x => x.Company.CompanyName; break;
            }

            string fullTextCleared = fullText?.Trim()?.ToLower() ?? "";
            var result = await FindManyIncludeTotalAsync(x =>
                fullTextCleared == ""
                || x.Email.ToLower().Contains(fullTextCleared)
                || (x.Personal != null && x.Personal.Firstname != null && x.Personal.Firstname.ToLower().Contains(fullTextCleared))
                || (x.Personal != null && x.Personal.Lastname != null && x.Personal.Lastname.Contains(fullTextCleared))
                || (x.Company != null && x.Company.CompanyName != null && x.Company.CompanyName.Contains(fullTextCleared)),
                sortType,
                sortFunc,
                skip,
                take
            );

            return result;
        }

        public async Task<UserModel> GetUser(string email)
        {
            var emailLower = email.ToLower();
            var users = await FindManyAsync(x => x.Email.ToLower() == emailLower);
            if (users.Count == 0)
                return null;

            return users.FirstOrDefault();
        }
    }

    public enum UserSortField
    {
        Firstname,
        Lastname,
        Email,
        CompanyName
    }
}
