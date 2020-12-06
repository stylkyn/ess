using ess_api.Core.Model;
using Libraries.Cryptography;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services
{
    public class UserSharedService : MainService
    {
        private readonly CryptographyLibrary _cryptographyLibrary;

        public UserSharedService()
        {
            _cryptographyLibrary = new CryptographyLibrary();
        }

        public async Task<UserModel> Add(string email, string password = null)
        {
            if (email == null) return null;

            var userExist = await _uow.Users.GetUser(email);
            if (userExist != null) return null;

            var user = new UserModel();
            user.Email = email;
            user.Password = password != null ? _cryptographyLibrary.CalculateHash(password) : null;

            user = await _uow.Users.InsertAsync(user);
            return user;
        }

    }
}
