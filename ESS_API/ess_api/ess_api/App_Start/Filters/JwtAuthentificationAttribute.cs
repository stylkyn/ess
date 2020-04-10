using ess_api._4_BL.Services.Responses;
using ess_api.Controllers;
using ess_api.Core.Constant;
using Libraries.Authetification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;

namespace ess_api.App_Start.Filters
{
    public class JwtAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        public bool AllowMultiple => false;
        public bool Optional;
        public readonly AuthentificationLibrary _authentificationLibrary;

        public JwtAuthenticationAttribute(bool optional = false) {
            _authentificationLibrary = new AuthentificationLibrary();
            Optional = optional;
        }


        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;
            // Getting Token value from header values.
            var token = authorization?.Parameter;
            var authUser =  _authentificationLibrary.AuthentificateJwt(token);

                //// checking request header value having required scheme "Bearer" or not.
                //if (authorization == null || authorization.Scheme != "Bearer" || string.IsNullOrEmpty(authorization.Parameter))
                //{
                //    context.ErrorResult = new CreateResult(new Response(ResponseStatus.NotFound, ResponseMessages.NotFound));
                //    return Task.FromResult(0);
                //}
            if (!Optional && (authUser == null || authUser.UserEmail == null || authUser.UserId == null))
            {
                context.ErrorResult = new CreateResult(new Response(ResponseStatus.NotFound, ResponseMessages.NotFound));
                return Task.FromResult(0);
            }

            if (authUser != null)
                context.Principal = new ClaimsPrincipal(
                    new ClaimsIdentity(
                        new List<Claim> {
                            new Claim(AuthentificationConstants.UserId, authUser?.UserId),
                            new Claim(AuthentificationConstants.UserEmail, authUser?.UserEmail)
                        }));
            return Task.FromResult(authUser);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}