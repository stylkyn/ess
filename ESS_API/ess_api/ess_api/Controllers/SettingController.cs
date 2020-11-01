using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Setting;
using ess_api._4_BL.Services.Setting.Requests;
using ess_api.App_Start.Filters;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Settings")]
    public class SettingController : BaseApiController
    {
        private SettingService _settingService;

        public SettingController()
        {
            _settingService = new SettingService();
        }

        [HttpGet]
        [JwtAuthenticationAdmin]
        [Route("Get")]
        public async Task<IHttpActionResult> Get([FromUri] Request request)
        {
            if (request == null)
                request = new Request();

            var response = await _settingService.Get(request);
            return new CreateResult(response);
        }

        [HttpPost]
        [JwtAuthenticationAdmin]
        [Route("Update")]
        public async Task<IHttpActionResult> Update([FromBody] UpdateSettingRequest request)
        {
            var response = await _settingService.Update(request);
            return new CreateResult(response);
        }
    }
}