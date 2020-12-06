using ess_api._4_BL.Services.Order.Requests;
using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Product;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
using Libraries.DocumentHtml.Abstraction;
using Libraries.DocumentHtml.Repositories;
using Libraries.Mailing;
using Libraries.Mailing.Abstraction;
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
        private readonly IMailingLibrary _mailingLibrary;
        private readonly IDocumentInvoiceRepository _documentInvoiceRepository;
        public OrderService()
        {
            _productSharedService = new ProductSharedService();
            _userSharedService = new UserSharedService();
            _mailingLibrary = new MailingLibrary();
            _documentInvoiceRepository = new DocumentInvoiceRepository();
        }

        public async Task<ResponseList<OrderResponse>> Search(OrderSearchRequest request)
        {
            int skip = request.PageNumber * request.PageSize;
            (var orders, int total) = await _uow.Orders.Search(request.FullText, request.UserId, request.OrderState, request.PaymentState, skip, request.PageSize);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result, total);
        }

        public async Task<ResponseList<OrderResponse>> GetAgentActiveOrders(Request request)
        {
            if (!request.RequestIdentity.HasAdminAccess && !request.RequestIdentity.HasAgentAccess)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var orders = await _uow.Orders.GetAgentActiveOrders(request?.RequestIdentity?.UserId);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result);
        }

        public async Task<ResponseList<OrderResponse>> GetAgentHistoryOrders(Request request)
        {
            if (!request.RequestIdentity.HasAdminAccess && !request.RequestIdentity.HasAgentAccess)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var orders = await _uow.Orders.GetAgentHistoryOrders(request?.RequestIdentity?.UserId);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result);
        }

        public async Task<ResponseList<OrderResponse>> GetAccountOrders(GetAccountOrdersRequest request)
        {
            var orders = await _uow.Orders.GetAccountOrders(request?.RequestIdentity?.UserId);
            if (orders == null)
                return new ResponseList<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var result = orders.Select(x => _mapService.MapOrder(x)).ToList();
            return new ResponseList<OrderResponse>(ResponseStatus.Ok, result);
        }

        public async Task<Response<OrderResponse>> GetOrder(GetOrderRequest request)
        {
            var order = await _uow.Orders.FindAsync(new Guid(request.OrderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.CannotFindOrder);

            if (!AuthentificateUserOrder(order, request.RequestIdentity))
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.CannotFindOrder);

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
            } else
            {
                // create user if user is not logged and email is not already exist
                var userEmailExist = await _uow.Users.FindManyAsync(x => x.Email == request.Customer.Personal.Contact.Email);
                if (userEmailExist.Count > 0)
                    user = userEmailExist.FirstOrDefault();
                else
                    user = await _userSharedService.Add(request.Customer?.Personal?.Contact?.Email, request.Customer?.Personal?.Password);
            }

            // if user with this email already exist
            if (user == null)
                return new Response<OrderResponse>(ResponseStatus.BadRequest, null, ResponseMessagesConstans.CannotAssignOrderToCustomer);

            if (request.CalculateOrder != null)
            {
                var calculatedData = await CalculateOrder(request.CalculateOrder.Products, request.CalculateOrder?.TransportId, request.CalculateOrder?.PaymentId);
                order.CalculatedData = calculatedData;

                order.State = OrderState.CalculateReady;

                if (calculatedData.HasTransport())
                    order.State = OrderState.TransportReady;

                if (calculatedData.HasPayment())
                    order.State = OrderState.PaymentReady;
            }

            if (request.Customer != null)
            {
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

            // if order still doest not exist, create new one
            if (order.Id == Guid.Empty)
            {
                order.OrderNumber = await _uow.Orders.GetNextOrderNumber();
                order.OrderNumberFormatted = order.GetForrmattedOrderNumber();
                order = await _uow.Orders.InsertAsync(order);
            }
            // if order exist, update it
            else order = await _uow.Orders.FindAndReplaceAsync(order.Id, order);

            // confirm order
            if (order.IsReadyToConfirm())
            {
                // deduct product count
                var productsInOrder = order.CalculatedData.Products.Where(p => p.Product.Type == ProductType.Buy || p.Product.Type == ProductType.Deposit).ToList();
                var productsInOrderId = productsInOrder.Select(p => p.Product.Id.ToString()).ToList();
                var products = await _productSharedService.GetSelected(productsInOrderId);

                var productUpdatedTask = new List<Task>();
                foreach (var product in products)
                {
                    int orderedCount = productsInOrder.FirstOrDefault(po => po.Product.Id == product.Id).Count;
                    var requestProduct = request.CalculateOrder.Products.FirstOrDefault(p => p.ProductId == product.Id.ToString());
                    if ((product.Stock.Count < orderedCount && product.Stock.Count > 0) || requestProduct.Count != orderedCount)
                        return new Response<OrderResponse>(ResponseStatus.BadRequest, null, $"{ResponseMessagesConstans.MissingGoodsInStock} Product: {product.Name} available: {product.Stock.Count} requested: {orderedCount}");
                    
                    product.Stock.Count -= orderedCount;
                    productUpdatedTask.Add(_productSharedService.Update(product));
                }
                await Task.WhenAll(productUpdatedTask);

                // TODO: Fix generating invoice on Azure 
                //string basePath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath;
                //var invoice = _documentInvoiceRepository.GenerateInvoice(order, basePath);
                //await _mailingLibrary.SendConfirmedOrderEmail(order, invoice);
                await _mailingLibrary.SendConfirmedOrderEmail(order, user, null);

                order.State = OrderState.Confirmed;
            }

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<OrderResponse>> SetOrderAgent(SetOrderAgentRequest request)
        {
            var order = await _uow.Orders.FindAsync(new Guid(request.OrderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.CannotFindOrder);

            // assign agent to product
            var product = order.CalculatedData.Products.FirstOrDefault(p => p.Product.Id.ToString() == request.ProductId);
            if (product == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.CannotFindProductInOrder);
            
            product.Service.UserId = request.UserId;

            // set Agents ready if are product is already assigned
            var hasEveryProductAgent = order.CalculatedData.Products.All(p => p.Service.UserId != null);
            if (hasEveryProductAgent)
                order.State = OrderState.AgentsReady;

            order = await _uow.Orders.FindAndReplaceAsync(order.Id, order);
            
            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<OrderResponse>> SetOrderState(SetOrderStateRequest request)
        {
            var order = await _uow.Orders.FindAsync(new Guid(request.OrderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.CannotFindOrder);

            // agent can set only specific states
            if (!request.RequestIdentity.HasAdminAccess && request.RequestIdentity.HasAgentAccess)
            {
                var availableStates = new List<OrderState> { OrderState.Finished };
                if (!availableStates.Contains(request.State))
                    return new Response<OrderResponse>(ResponseStatus.BadRequest, null, ResponseMessagesConstans.AgentHasNotPermissionSetThisState);
            }

            order.State = request.State;
            order = await _uow.Orders.FindAndReplaceAsync(order.Id, order);

            var user = await _uow.Users.FindAsync(new Guid(order.Customer.UserId));
            if (user != null)
                await _mailingLibrary.SendChangeOrderStateEmail(order, user);

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<OrderResponse>> SetOrderPaymentState(SetOrderPaymentStateRequest request)
        {
            var order = await _uow.Orders.FindAsync(new Guid(request.OrderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.CannotFindOrder);

            order.PaymentState = request.PaymentState;
            order = await _uow.Orders.FindAndReplaceAsync(order.Id, order);

            var user = await _uow.Users.FindAsync(new Guid(order.Customer.UserId));
            if (user != null)
                await _mailingLibrary.SendChangePaymentStateEmail(order, user);

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<CalculatedOrderResponse>> CalculateOrder(CalculateOrderRequest request)
        {
            var calculatedData = await CalculateOrder(request.Products, request.TransportId, request.PaymentId);

            var response = _mapService.MapCalculatedOrder(calculatedData);
            return new Response<CalculatedOrderResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<OrderResponse>> VerifyProductsAvailability(string orderId)
        {
            var order = await _uow.Orders.FindAsync(new Guid(orderId));
            if (order == null)
                return new Response<OrderResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.CannotFindOrder);

            var productsInOrder = order.CalculatedData.Products.Where(p => p.Product.Type == ProductType.Buy || p.Product.Type == ProductType.Deposit).ToList();
            var productsInOrderId = productsInOrder.Select(p => p.Product.Id.ToString()).ToList();
            var products = await _productSharedService.GetSelected(productsInOrderId);

            var productUpdatedTask = new List<Task>();
            foreach (var product in products)
            {
                int orderedCount = productsInOrder.FirstOrDefault(po => po.Product.Id == product.Id).Count;
                if (product.Stock.Count < orderedCount)
                    return new Response<OrderResponse>(ResponseStatus.BadRequest, null, $"{ResponseMessagesConstans.MissingGoodsInStock} Product: {product.Name} available: {product.Stock.Count} requested: {orderedCount}");
            }

            var response = _mapService.MapOrder(order);
            return new Response<OrderResponse>(ResponseStatus.Ok, response);
        }

        private async Task<CalculatedOrder> CalculateOrder(List<CalculatedOrderProductRequest> products, string transportId, string paymentId)
        {
            var calculatedData = new CalculatedOrder();

            // add products
            var productsIds = products.Select(p => p.ProductId).ToList();
            var selectedProducts = await _productSharedService.GetSelected(productsIds);
            calculatedData.Products = selectedProducts.Select(p => {
                var productRequest = products.FirstOrDefault(x => x.ProductId == p.Id.ToString());
                var res = new CalculatedOrderProduct
                {
                    Product = p,
                    Service = p.Service != null ? new CalculatedOrderProductService
                    {
                        Date = productRequest?.ServiceDate,
                    } : null,
                    Count = productRequest?.Count ?? 1,
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
                    SourceData = transport,
                } : null;
            }
            // add payment 
            if (paymentId != null)
            {
                var payment = await _uow.Payments.FindAsync(new Guid(paymentId));
                calculatedData.Payment = payment != null ? new CalculatedOrderPayment
                {
                    PaymentId = payment.Id.ToString(),
                    SourceData = payment,
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
