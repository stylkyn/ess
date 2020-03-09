using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using Libraries.Authetification;
using Libraries.Authetification.Responses;
using Libraries.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services
{
    public class UserService : MainService
    {
        public readonly CryptographyLibrary _cryptographyLibrary;
        public readonly AuthentificationLibrary _authentificationLibrary;

        public UserService()
        {
            _cryptographyLibrary = new CryptographyLibrary();
            _authentificationLibrary = new AuthentificationLibrary();
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

        public async Task<Response<UserResponse>> Authentification(AuthentificationRequest request)
        {
            var user = await _uow.Users.GetUser(request.Email);
            if (user == null)
                return new Response<UserResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var passwordRequestHashed = _cryptographyLibrary.CalculateHash(request.Password);
            if (passwordRequestHashed != user.Password)
                return new Response<UserResponse>(ResponseStatus.BadRequest, null, ResponseMessages.PasswordIsNotValid);

            var token = _authentificationLibrary.GenerateJWT(user);
            return new Response<UserResponse>(ResponseStatus.Ok, MapUser(user, token));
        }

        public async Task<Response<UserResponse>> Add(UserAddRequest request)
        {
            var userExist = await _uow.Users.GetUser(request.Email);
            if (userExist != null)
                return new Response<UserResponse>(ResponseStatus.BadRequest, null, ResponseMessages.EmailAlreadyExist);

            var user = new UserModel();
            user.Email = request.Email;
            user.Password = _cryptographyLibrary.CalculateHash(request.Password);

            user = await _uow.Users.InsertAsync(user);
            return new Response<UserResponse>(ResponseStatus.Ok, MapUser(user));
        }

        public async Task<Response> Update(UserRequest user)
        {
            await _uow.Users.ReplaceAsync(user.Id, user);
            return new Response(ResponseStatus.Ok);
        }

        private UserResponse MapUser(UserModel user, AuthentificationTokenResponse token = null)
        {
            return new UserResponse {
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Token = token
            };
        }

        private List<UserResponse> MapUsers(List<UserModel> users)
        {
            return users.Select(x => MapUser(x)).ToList();
        }
    }
}
