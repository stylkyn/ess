using ess_api._4_BL.Services.Order;
using ess_api._4_BL.Services.Order.Requests;
using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.App_Start.Filters;
using System;
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

        [HttpGet]
        [JwtAuthentication]
        [Route("GetAccountOrders")]
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

        [HttpGet]
        [JwtAuthentication]
        [Route("GetAgentActiveOrders")]
        public async Task<IHttpActionResult> GetAgentActiveOrders(Request request)
        {
            if (request == null)
                request = new Request();
            var response = await _orderService.GetAgentActiveOrders(request);
            return new CreateResult(response);
        }

        [HttpGet]
        [JwtAuthentication]
        [Route("GetAgentHistoryOrders")]
        public async Task<IHttpActionResult> GetAgentHistoryOrders(Request request)
        {
            if (request == null)
                request = new Request();
            var response = await _orderService.GetAgentHistoryOrders(request);
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
            try
            {
                var response = await _orderService.SetOrder(request);
                return new CreateResult(response);
            } catch(Exception e)
            {
                var response = new Response<OrderResponse>(ResponseStatus.InternalError, null, e.Message);
                return new CreateResult(response);
            }
        }

        [HttpPost]
        [RequiredRequest]
        [JwtAuthenticationAdmin]
        [Route("UpdateOrder")]
        public async Task<IHttpActionResult> UpdateOrder([FromBody] UpdateOrderRequest request)
        {
            try
            {
                var response = await _orderService.UpdateOrder(request);
                return new CreateResult(response);
            }
            catch (Exception e)
            {
                var response = new Response<OrderResponse>(ResponseStatus.InternalError, null, e.Message);
                return new CreateResult(response);
            }
        }

        [HttpPut]
        [JwtAuthenticationAdmin]
        [Route("SetOrderAgent")]
        public async Task<IHttpActionResult> SetOrderAgent([FromBody] SetOrderAgentRequest request)
        {
            var response = await _orderService.SetOrderAgent(request);
            return new CreateResult(response);
        }

        [HttpPut]
        [JwtAuthenticationAgent]
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

        [HttpGet]
        [JwtAuthentication]
        [Route("VerifyProductsAvailability")]
        public async Task<IHttpActionResult> VerifyProductsAvailability([FromUri] string orderId)
        {
            var response = await _orderService.VerifyProductsAvailability(orderId);
            return new CreateResult(response);
        }
    }
}