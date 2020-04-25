using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using Libraries.Authetification;
using Libraries.Cryptography;
using System;
using System.Collections.Generic;
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


        public async Task<Response<UserResponse>> Get(string id)
        {
            var user = await _uow.Users.FindAsync(new Guid(id));
            return new Response<UserResponse>(ResponseStatus.Ok, _mapService.MapUser(user));
        }
        public async Task<ResponseList<UserResponse>> Search(UserSearchRequest request)
        {
            int skip = request.PageNumber * request.PageSize;
            (var users, int total) = await _uow.Users.SearchUser(request.FullText, skip, request.PageSize, request.SortType, request.SortField);
            return new ResponseList<UserResponse>(ResponseStatus.Ok, _mapService.MapUsers(users.ToList(), true), total);
        }

        public async Task<Response<UserResponse>> Authentification(Request request)
        {
            var user = await _uow.Users.FindAsync(new Guid(request.RequestIdentity.UserId));
            if (user == null)
                return new Response<UserResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var token = _authentificationLibrary.GenerateJWT(user);
            return new Response<UserResponse>(ResponseStatus.Ok, _mapService.MapUser(user, token));
        }

        public async Task<Response<UserResponse>> AuthentificationAdmin(AuthentificationRequest request)
        {
            var user = await _uow.Users.GetUser(request.Email);
            if (user == null)
                return new Response<UserResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            if (!user.HasAdminAccess)
                return new Response<UserResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            if (user.Password == null)
                return new Response<UserResponse>(ResponseStatus.BadRequest, null, ResponseMessages.PasswordIsNotValid);

            var passwordRequestHashed = _cryptographyLibrary.CalculateHash(request.Password);
            if (passwordRequestHashed != user.Password)
                return new Response<UserResponse>(ResponseStatus.BadRequest, null, ResponseMessages.PasswordIsNotValid);


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

        // this method can update any user if is admin logged or any user can update yourself
        public async Task<Response<UserResponse>> Update(UserUpdateRequest request)
        {
            if (request.Id != null && !request.RequestIdentity.HasAdminAccess)
                return new Response<UserResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);
            // edit passed user if admin is loggged or edit yourself
            string userToEdit = request.Id != null ? request.Id : request.RequestIdentity.UserId;

            var user = await _uow.Users.FindAsync(new Guid(userToEdit));
            user.Personal = new UserPersonal
            {
                Address = request.Personal.Address,
                Contact = request.Personal.Contact,
                Firstname = request.Personal.Firstname,
                Lastname = request.Personal.Lastname,
            };
            user.Company = request.Company != null ? new UserCompany
            {
                Address = request.Company.Address != null ? request.Company.Address : request.Personal.Address,
                CompanyId = request.Company.CompanyId,
                CompanyName = request.Company.CompanyName,
                CompanyVat = request.Company.CompanyVat
            } : new UserCompany();

            await _uow.Users.ReplaceAsync(user.Id, user);
            return new Response<UserResponse>(ResponseStatus.Ok, _mapService.MapUser(user));
        }

        public async Task<Response> Remove(UserRemoveRequest request)
        {
            if (request.Id == request.RequestIdentity.UserId)
                return new Response(ResponseStatus.BadRequest, ResponseMessages.CannotDeleteYourself);

            await _uow.Users.DeleteAsync(new Guid(request.Id));
            return new Response(ResponseStatus.Ok);
        }
    }
}
