using ess_api._4_BL.Services.Order;
using ess_api._4_BL.Services.Order.Requests;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Requests;
using ess_api.App_Start.Filters;
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

        [HttpGet]
        [JwtAuthenticationAdmin]
        [Route("Search")]
        public async Task<IHttpActionResult> Search([FromUri] OrderSearchRequest request)
        {
            var response = await _orderService.Search(request);
            return new CreateResult(response);
        }

        [JwtAuthentication]
        [Route("GetAccountOrders")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAccountOrders([FromUri]GetAccountOrdersRequest request)
        {
            if (request == null)
                request = new GetAccountOrdersRequest();
            var response = await _orderService.GetAccountOrders(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [JwtAuthentication]
        [RequiredRequest]
        [Route("GetOrder")]
        public async Task<IHttpActionResult> GetOrder([FromUri] GetOrderRequest request)
        {
            var response = await _orderService.GetOrder(request);
            return new CreateResult(response);
        }


        [HttpPost]
        [Route("CalculateOrder")]
        public async Task<IHttpActionResult> CalculateOrder([FromBody] CalculateOrderRequest request)
        {
            var response = await _orderService.CalculateOrder(request);
            return new CreateResult(response);
        }

        [HttpPost]
        [RequiredRequest]
        [JwtAuthentication(Optional = true)]
        [Route("SetOrder")]
        public async Task<IHttpActionResult> SetOrder([FromBody] SetOrderRequest request)
        {
            var response = await _orderService.SetOrder(request);
            return new CreateResult(response);
        }

        [HttpPut]
        [JwtAuthenticationAdmin]
        [Route("SetOrderState")]
        public async Task<IHttpActionResult> SetOrderState([FromBody] SetOrderStateRequest request)
        {
            var response = await _orderService.SetOrderState(request);
            return new CreateResult(response);
        }

        [HttpPut]
        [JwtAuthenticationAdmin]
        [Route("SetPaymentState")]
        public async Task<IHttpActionResult> SetPaymentState([FromBody] SetOrderPaymentStateRequest request)
        {
            var response = await _orderService.SetOrderPaymentState(request);
            return new CreateResult(response);
        }
    }
}