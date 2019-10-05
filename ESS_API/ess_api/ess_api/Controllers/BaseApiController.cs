using ess_api.Repository;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace ess_api.Controllers
{
    public class BaseApiController : ApiController
    {
        public BaseApiController() { }

        public override Task<HttpResponseMessage> ExecuteAsync(HttpControllerContext controllerContext, CancellationToken cancellationToken)
        {
            string lang = controllerContext.Request.RequestUri.Segments[2];
            lang = lang.Remove(lang.Length - 1, 1); // orezani lomitka (z cs/ udela cs)
            RepositorySettings.language_code = lang;

            return base.ExecuteAsync(controllerContext, cancellationToken);
        }
    }
}