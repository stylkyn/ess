using ess_api._4_BL.Services.Payment;
using ess_api._4_BL.Services.Payment.Requests;
using ess_api._4_BL.Services.Transport.Requests;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Payments")]
    public class PaymentController : BaseApiController
    {
        private PaymentService _paymentService;

        public PaymentController()
        {
            _paymentService = new PaymentService();
        }

        [HttpGet]
        [Route("GetPaymentByTransport")]
        public async Task<IHttpActionResult> Search([FromUri] PaymentGetByTransportRequest request)
        {
            var response = await _paymentService.GetPaymentByTransport(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [Route("Search")]
        public async Task<IHttpActionResult> Search([FromUri] PaymentSearchRequest request)
        {
            var response = await _paymentService.Search(request);
            return new CreateResult(response);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IHttpActionResult> Put([FromBody]PaymentUpdateRequest request)
        {
            var response = await _paymentService.Update(request);
            return new CreateResult(response);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IHttpActionResult> Post([FromBody]PaymentAddRequest request)
        {
            var response = await _paymentService.Add(request);
            return new CreateResult(response);
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IHttpActionResult> Delete(string Id)
        {
            var response = await _paymentService.Remove(Id);
            return new CreateResult(response);
        }

    }
}