using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ess_api._4_BL.Services
{
    public class UserService : MainService
    {
        /*
        * GET
        * **/
        public UserResponse VerifySocialLogin(SocialLogin socialLogin)
        {
            return null;
        }

        public UserResponse VerifyLogin(Login login)
        {
            return null;
        }

        public List<UserResponse> Get()
        {
            return MapUsers(_uow.Users.FindMany().ToList());
        }

        public UserResponse Get(string id)
        {
            return MapUser(_uow.Users.Find(new Guid(id)));
        }

        /*
         *  SET
         * **/
        public void Add(UserRequest user)
        {
            _uow.Users.Insert(user);
        }

        public void Update(UserRequest user)
        {
            _uow.Users.Replace(user.Id, user);
        }

        private UserResponse MapUser(UserModel user)
        {
            return (UserResponse)user;
        }

        private List<UserResponse> MapUsers(List<UserModel> users)
        {
            return users.Select(x => MapUser(x)).ToList();
        }
    }
}
