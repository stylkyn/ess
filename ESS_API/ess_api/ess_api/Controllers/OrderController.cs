using ess_api._4_BL.Services.Order;
using ess_api._4_BL.Services.Order.Requests;
using System.Threading.Tasks;
using System.Web.Http;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Orders")]
    public class OrdersController : BaseApiController
    {
        private OrderService _orderService;

        public OrdersController()
        {
            _orderService = new OrderService();
        }

        [HttpPost]
        [Route("CalculateOrder")]
        public async Task<IHttpActionResult> CalculateOrder([FromBody] CalculateOrderRequest request)
        {
            var response = await _orderService.CalculateOrder(request);
            return new CreateResult(response);
        }
    }
}