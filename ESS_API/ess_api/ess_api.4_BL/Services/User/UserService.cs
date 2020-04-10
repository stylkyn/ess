using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using Libraries.Authetification;
using Libraries.Cryptography;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services
{
    public class UserService : MainService
    {
        private readonly CryptographyLibrary _cryptographyLibrary;
        private readonly AuthentificationLibrary _authentificationLibrary;
        private readonly UserSharedService _userSharedService;

        public UserService()
        {
            _cryptographyLibrary = new CryptographyLibrary();
            _authentificationLibrary = new AuthentificationLibrary();
            _userSharedService = new UserSharedService();
        }

        public async Task<ResponseList<UserResponse>> Get()
        {
            var users = await _uow.Users.FindManyAsync();
            return new ResponseList<UserResponse>(ResponseStatus.Ok, _mapService.MapUsers(users.ToList()));
        }

        public async Task<Response<UserResponse>> Get(string id)
        {
            var user = await _uow.Users.FindAsync(new Guid(id));
            return new Response<UserResponse>(ResponseStatus.Ok, _mapService.MapUser(user));
        }

        public async Task<Response<UserResponse>> Authentification(Request request)
        {
            var user = await _uow.Users.FindAsync(new Guid(request.RequestIdentity.UserId));
            if (user == null)
                return new Response<UserResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var token = _authentificationLibrary.GenerateJWT(user);
            return new Response<UserResponse>(ResponseStatus.Ok, _mapService.MapUser(user, token));
        }

        public async Task<Response<UserResponse>> Authentification(AuthentificationRequest request)
        {
            var user = await _uow.Users.GetUser(request.Email);
            if (user == null)
                return new Response<UserResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);
            
            if (user.Password == null)
                return new Response<UserResponse>(ResponseStatus.BadRequest, null, ResponseMessages.PasswordIsNotValid);

            var passwordRequestHashed = _cryptographyLibrary.CalculateHash(request.Password);
            if (passwordRequestHashed != user.Password)
                return new Response<UserResponse>(ResponseStatus.BadRequest, null, ResponseMessages.PasswordIsNotValid);

            var token = _authentificationLibrary.GenerateJWT(user);
            return new Response<UserResponse>(ResponseStatus.Ok, _mapService.MapUser(user, token));
        }

        public async Task<Response<UserResponse>> Add(UserAddRequest request)
        {
            var user = await _userSharedService.Add(request.Email, request.Password);
            if (user == null)
                return new Response<UserResponse>(ResponseStatus.BadRequest, null, ResponseMessages.EmailAlreadyExist);

            var token = _authentificationLibrary.GenerateJWT(user);
            return new Response<UserResponse>(ResponseStatus.Ok, _mapService.MapUser(user, token));
        }

        public async Task<Response> Update(UserRequest user)
        {
            await _uow.Users.ReplaceAsync(user.Id, user);
            return new Response(ResponseStatus.Ok);
        }
    }
}
