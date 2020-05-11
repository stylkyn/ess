using ess_api._4_BL.Services.Order.Requests;
using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Product;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Order
{
    public class OrderService : MainService
    {
        private readonly ProductSharedService _productSharedService;
        private readonly UserSharedService _userSharedService;
        public OrderService()
        {
            _productSharedService = new ProductSharedService();
            _userSharedService = new UserSharedService();
        }

        public async Task<ResponseList<OrderResponse>> Search(OrderSearchRequest request)
        {
            int skip = request.PageNumber * request.PageSize;
            (var orders, int total) = await _uow.Orders.Search(request.FullText, request.UserId, request.OrderState, request.PaymentState, skip, request.PageSize);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result, total);
        }

        public async Task<ResponseList<OrderResponse>> GetAgentActiveOrders(Request request)
        {
            if (!request.RequestIdentity.HasAdminAccess && !request.RequestIdentity.HasAgentAccess)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var orders = await _uow.Orders.GetAgentActiveOrders(request?.RequestIdentity?.UserId);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result);
        }

        public async Task<ResponseList<OrderResponse>> GetAgentHistoryOrders(Request request)
        {
            if (!request.RequestIdentity.HasAdminAccess && !request.RequestIdentity.HasAgentAccess)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var orders = await _uow.Orders.GetAgentHistoryOrders(request?.RequestIdentity?.UserId);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result);
        }

        public async Task<ResponseList<OrderResponse>> GetAccountOrders(GetAccountOrdersRequest request)
        {
            var orders = await _uow.Orders.GetAccountOrders(request?.RequestIdentity?.UserId);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result);
        }

        public async Task<Response<OrderResponse>> GetOrder(GetOrderRequest request)
        {
            var order = await _uow.Orders.FindAsync(new Guid(request.OrderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.CannotFindOrder);

            if (!AuthentificateUserOrder(order, request.RequestIdentity))
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.CannotFindOrder);

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<OrderResponse>> SetOrder(SetOrderRequest request)
        {
            OrderModel order = new OrderModel();
            UserModel user = null;
            // if user is logged
            if (request.RequestIdentity.IsAuthentificated)
            {
                user = await _uow.Users.FindAsync(new Guid(request.RequestIdentity.UserId));
                var latestOrder = await _uow.Orders.GetLastUserOrderInProgress(user.Id.ToString());
                // if user has order in progress, use the exist order
                if (latestOrder != null)
                    order = latestOrder;
                // if user has no order in progress, assign user to new order
                else order.Customer = new OrderCustomer { UserId = user.Id.ToString() };
            }
            // if user with this email already exist
            if (user == null)
                return new Response<OrderResponse>(ResponseStatus.BadRequest, null, ResponseMessages.CannotAssignOrderToCustomer);

            if (request.CalculateOrder != null)
            {
                var calculatedData = await CalculateOrder(request.CalculateOrder.Products, request.Transport?.TransportId, request.Payment?.PaymentId);
                order.CalculatedData = calculatedData;

                order.State = OrderState.CalculateReady;
            }

            if (request.Service != null)
            {
                order.Service = new OrderAgentService
                {
                    Date = request.Service.Date
                };
            }

            if (request.Transport != null)
            {
                var transport = await _uow.Transports.FindAsync(new Guid(request.Transport.TransportId));
                if (transport == null)
                    return new Response<OrderResponse>(ResponseStatus.BadRequest, null, ResponseMessages.CannotAssignTransportToOrder);

                order.Transport = new OrderTransport();
                order.Transport.TransportId = transport.Id.ToString();
                order.Transport.SourceData = transport;
                order.Transport.SetTransporttData(transport);

                order.State = OrderState.TransportReady;
            }

            if (request.Payment != null)
            {
                var payment = await _uow.Payments.FindAsync(new Guid(request.Payment.PaymentId));
                if (payment == null)
                    return new Response<OrderResponse>(ResponseStatus.BadRequest, null, ResponseMessages.CannotAssignPaymentToOrder);

                order.Payment = new OrderPayment();
                order.Payment.PaymentId = payment.Id.ToString();
                order.Payment.State = PaymentState.NotPaid;
                order.Payment.SetPaymentData(payment);
                order.Payment.SourceData = payment;

                order.State = OrderState.PaymentReady;
            }

            if (request.Customer != null)
            {
                // create user if user is not logged
                if (!request.RequestIdentity.IsAuthentificated)
                    user = await _userSharedService.Add(request.Customer?.Personal?.Contact?.Email);

                // assign customer data
                order.Customer = new OrderCustomer
                {
                    UserId = user.Id.ToString(),
                    Personal = new UserPersonal
                    {
                        Address = request.Customer.Personal.Address,
                        Contact = request.Customer.Personal.Contact,
                        Firstname = request.Customer.Personal.Firstname,
                        Lastname = request.Customer.Personal.Lastname,
                    },
                    Company = request.Customer.Company != null ? new UserCompany
                    {
                        Address = request.Customer.Company.Address != null ? request.Customer.Company.Address : request.Customer.Personal.Address,
                        CompanyId = request.Customer.Company.CompanyId,
                        CompanyName = request.Customer.Company.CompanyName,
                        CompanyVat = request.Customer.Company.CompanyVat
                    } : null,
                };

                order.State = OrderState.CustomerReady;
            }

            if (order.IsReadyToConfirm())
                order.State = OrderState.Confirmed;

            // if order still doest not exist, create new one
            if (order.Id == Guid.Empty)
            {
                order.OrderNumber = await _uow.Orders.GetNextOrderNumber();
                order.OrderNumberFormatted = order.GetForrmattedOrderNumber();
                order = await _uow.Orders.InsertAsync(order);
            }
            // if order exist, update it
            else order = await _uow.Orders.FindAndReplaceAsync(order.Id, order);

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<OrderResponse>> SetOrderState(SetOrderStateRequest request)
        {
            var order = await _uow.Orders.FindAsync(new Guid(request.OrderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.CannotFindOrder);

            order.State = request.State;
            order = await _uow.Orders.FindAndReplaceAsync(order.Id, order);

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<OrderResponse>> SetOrderPaymentState(SetOrderPaymentStateRequest request)
        {
            var order = await _uow.Orders.FindAsync(new Guid(request.OrderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessages.CannotFindOrder);

            order.Payment.State = request.PaymentState;
            order = await _uow.Orders.FindAndReplaceAsync(order.Id, order);

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<CalculatedOrderResponse>> CalculateOrder(CalculateOrderRequest request)
        {
            var calculatedData = await CalculateOrder(request.Products, request.TransportId, request.PaymentId);

            var response = _mapService.MapCalculatedOrder(calculatedData);
            return new Response<CalculatedOrderResponse>(ResponseStatus.Ok, response);
        }

        private async Task<CalculatedOrder> CalculateOrder(List<CalculatedOrderProductRequest> products, string transportId, string paymentId)
        {
            var calculatedData = new CalculatedOrder();

            // add products
            var productsIds = products.Select(p => p.ProductId).ToList();
            var selectedProducts = await _productSharedService.GetSelected(productsIds);
            calculatedData.Products = selectedProducts.Select(p => {
                var res = new CalculatedOrderProduct
                {
                    Product = p,
                    Count = products.FirstOrDefault(x => x.ProductId == p.Id.ToString())?.Count ?? 0,
                };
                res.TotalPrice = res.CalculateTotal();
                return res;
            }).ToList();

            // add transport 
            if (transportId != null)
            {
                var transport = await _uow.Transports.FindAsync(new Guid(transportId));
                calculatedData.Transport = transport != null ? new CalculatedOrderTransport
                {
                    TransportId = transport.Id.ToString(),
                    Type = transport.Type,
                    Name = transport.Name,
                    TotalPrice = transport.TotalPrice
                } : null;
            }
            // add payment 
            if (paymentId != null)
            {
                var payment = await _uow.Payments.FindAsync(new Guid(paymentId));
                calculatedData.Payment = payment != null ? new CalculatedOrderPayment
                {
                    PaymentId = payment.Id.ToString(),
                    Type = payment.Type,
                    Name = payment.Name,
                    TotalPrice = payment.TotalPrice
                } : null;
            }

            calculatedData.Total = new CalculatedOrderTotal
            {
                TotalPrice = calculatedData.CalculateTotal()
            };
            return calculatedData;
        }

        public bool AuthentificateUserOrder(OrderModel order, RequestIdentity user)
        {
            return order.Customer?.UserId == user.UserId || user.HasAdminAccess || user.HasAgentAccess;
        }
    }
}
