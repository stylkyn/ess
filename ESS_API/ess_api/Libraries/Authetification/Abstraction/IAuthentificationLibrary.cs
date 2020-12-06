using ess_api.Core.Model;
using Libraries.Authetification.Responses;

namespace Libraries.Authetification.Abstraction
{
    public interface IAuthentificationLibrary
    {
        AuthentificationTokenResponse GenerateJWT(UserModel user);
        AuthentificationUserResponse AuthentificateJwt(string token);
    }
}
