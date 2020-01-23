using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services
{
    public class UserService : MainService
    {
        /*
        * GET
        * **/
        public async Task<Response<UserResponse>> VerifySocialLogin(SocialLogin socialLogin)
        {
            return null;
        }

        public async Task<Response<UserResponse>> VerifyLogin(Login login)
        {
            return null;
        }

        public async Task<ResponseList<UserResponse>> Get()
        {
            var users = await _uow.Users.FindManyAsync();
            return new ResponseList<UserResponse>(ResponseStatus.Ok, MapUsers(users.ToList()));
        }

        public async Task<Response<UserResponse>> Get(string id)
        {
            var user = await _uow.Users.FindAsync(new Guid(id));
            return new Response<UserResponse>(ResponseStatus.Ok, MapUser(user));
        }

        /*
         *  SET
         * **/
        public async Task<Response> Add(UserRequest user)
        {
            await _uow.Users.InsertAsync(user);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Update(UserRequest user)
        {
            await _uow.Users.ReplaceAsync(user.Id, user);
            return new Response(ResponseStatus.Ok);
        }

        private UserResponse MapUser(UserModel user)
        {
            return new UserResponse {
                Firstname = user.Firstname,
                Lastname = user.Lastname
            };
        }

        private List<UserResponse> MapUsers(List<UserModel> users)
        {
            return users.Select(x => MapUser(x)).ToList();
        }
    }
}
