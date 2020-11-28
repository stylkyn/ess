using ess_api._4_BL.Services.Transport;
using ess_api._4_BL.Services.Transport.Requests;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Transports")]
    public class TransportController : BaseApiController
    {
        private TransportService _transportService;

        public TransportController()
        {
            _transportService = new TransportService();
        }

        [HttpGet]
        [Route("GetTransportsForOrder")]
        public async Task<IHttpActionResult> GetTransportsForOrder([FromUri] TransportForOrderRequest request)
        {
            var response = await _transportService.GetTransportsForOrder(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [Route("Search")]
        public async Task<IHttpActionResult> Search([FromUri] TransportSearchRequest request)
        {
            var response = await _transportService.Search(request);
            return new CreateResult(response);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IHttpActionResult> Put([FromBody]TransportUpdateRequest request)
        {
            var response = await _transportService.Update(request);
            return new CreateResult(response);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IHttpActionResult> Post([FromBody]TransportAddRequest request)
        {
            var response = await _transportService.Add(request);
            return new CreateResult(response);
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IHttpActionResult> Delete(string Id)
        {
            var response = await _transportService.Remove(Id);
            return new CreateResult(response);
        }
    }
}