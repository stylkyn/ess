using ess_api.Core.Model;
using System.Collections.Generic;

namespace ess_api._4_BL.Services
{
    public class UserService : MainService
    {
        /*
        * GET
        * **/
        public user VerifySocialLogin(SocialLogin socialLogin)
        {
            return _uow.Users.GetUserBySocialLogin(socialLogin);
        }

        public user VerifyLogin(Login login)
        {
            return _uow.Users.GetUserByLogin(login);
        }

        public IEnumerable<user> Get()
        {
            return _uow.Users.GetAll();
        }

        public user Get(int Id)
        {
            return _uow.Users.Find(Id);
        }

        /*
         *  SET
         * **/
        public void Add(user user)
        {
            _uow.Users.Add(user);
            _uow.Complete();
        }

        public void Update(user user)
        {
            _uow.Users.Update(user);
            _uow.Complete();
        }

        public void Remove(int Id)
        {
            user user = Get(Id);
            _uow.Users.Remove(user);
            _uow.Complete();
        }

        public void RemoveRange(IEnumerable<user> users)
        {
            _uow.Users.RemoveRange(users);
            _uow.Complete();
        }
    }
}
