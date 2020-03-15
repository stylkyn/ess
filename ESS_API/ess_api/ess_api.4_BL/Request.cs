using ess_api.Core.Constant;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace ess_api._4_BL.Services.Requests
{
    public class Request
    {
        public RequestIdentity RequestIdentity { get; set; } = new RequestIdentity();
    }

    public class RequestIdentity
    {
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public bool IsAuthentificated { get; set; } = false;

        public RequestIdentity()
        {
            ClaimsPrincipal principal = HttpContext.Current.User as ClaimsPrincipal;
            var claims = principal.Claims.ToList();
            if (claims.Count() > 0)
            {
                UserId = claims.FirstOrDefault(x => x.Type == AuthentificationConstants.UserId)?.Value;
                UserEmail = claims.FirstOrDefault(x => x.Type == AuthentificationConstants.UserEmail)?.Value;
                IsAuthentificated = true;
            }

        } 
    }
}
