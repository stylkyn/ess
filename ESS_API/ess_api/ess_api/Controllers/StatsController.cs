using ess_api._4_BL.Services.Order;
using ess_api._4_BL.Services.Order.Requests;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Stats;
using ess_api.App_Start.Filters;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Stats")]
    public class StatsController : BaseApiController
    {
        private StatsService _statsService;

        public StatsController()
        {
            _statsService = new StatsService();
        }

        [HttpGet]
        [JwtAuthenticationAdmin]
        [Route("GetStats")]
        public async Task<IHttpActionResult> GetStats(Request request)
        {
            var response = await _statsService.GetStats(request);
            return new CreateResult(response);
        }
    }
}