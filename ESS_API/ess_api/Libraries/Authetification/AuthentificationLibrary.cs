using ess_api.Core.Constant;
using ess_api.Core.Model;
using Libraries.Authetification.Responses;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Libraries.Authetification
{
    public class AuthentificationLibrary
    {
        public readonly byte[] _secret;
        public readonly JwtSecurityTokenHandler _handler;

        public AuthentificationLibrary ()
        {
            _secret = Encoding.ASCII.GetBytes(AuthentificationConstants.JwtSecret);
            _handler = new JwtSecurityTokenHandler();
        }


        public AuthentificationTokenResponse GenerateJWT(UserModel user)
        {

            DateTime expiresDate = DateTime.UtcNow.AddDays(7);
            var token = _handler.CreateToken(new SecurityTokenDescriptor
            {
                Expires = expiresDate,
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(AuthentificationConstants.HasAdminAccess, user.HasAdminAccess.ToString())
                }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_secret), SecurityAlgorithms.HmacSha512Signature)
            });

            var tokenString = _handler.WriteToken(token);
            return new AuthentificationTokenResponse
            {
                Jwt = tokenString,
                ExpiresDate = expiresDate
            };
        }

        public AuthentificationUserResponse AuthentificateJwt(string token)
        {
            if (token == null)
                return null;

            //validate jwt
            SecurityToken validatedToken;
            var param = new TokenValidationParameters
            {
                ClockSkew = TimeSpan.FromMinutes(1),
                IssuerSigningKey = new SymmetricSecurityKey(_secret),
                ValidateIssuerSigningKey = true,
                ValidateAudience = false,
                ValidateIssuer = false,
            };

            try
            {
                var claims = _handler.ValidateToken(token, param, out validatedToken);

                return new AuthentificationUserResponse
                {
                    UserEmail = claims.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
                    UserId = claims.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
                };
            } catch (Exception e)
            {
                return null;
            }
        }
    }
}
