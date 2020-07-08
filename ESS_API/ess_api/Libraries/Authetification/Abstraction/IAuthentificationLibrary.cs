using ess_api.Core.Model;
using Libraries.Authetification.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libraries.Authetification.Abstraction
{
    public interface IAuthentificationLibrary
    {
        AuthentificationTokenResponse GenerateJWT(UserModel user);
        AuthentificationUserResponse AuthentificateJwt(string token);
    }
}
