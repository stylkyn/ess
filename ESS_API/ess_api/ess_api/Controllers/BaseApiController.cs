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
            return base.ExecuteAsync(controllerContext, cancellationToken);
        }
    }
}