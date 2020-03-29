using ess_api._4_BL.Services.Order.Model;
using ess_api._4_BL.Services.Order.Requests;
using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Product;
using ess_api._4_BL.Services.Responses;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Order
{
    public class OrderService : MainService
    {
        private readonly ProductSharedService _productSharedService;
        public OrderService()
        {
            _productSharedService = new ProductSharedService();
        }
        public async Task<Response<CalculatedOrderResponse>> CalculateOrder(CalculateOrderRequest request)
        {
            var calculatedData = new CalculatedOrder();

            var productsIds = request.Products.Select(p => p.ProductId).ToList();
            var selectedProducts = await _productSharedService.GetSelected(productsIds);
            calculatedData.Products = selectedProducts.Select(p => {
                var res = new CalculatedOrderProduct
                {
                    Product = p,
                    Count = request.Products.FirstOrDefault(x => x.ProductId == p.Id.ToString())?.Count ?? 0,
                };
                res.TotalPrice = res.CalculateTotal();
                return res;
            }).ToList();

            calculatedData.Total = new CalculatedOrderTotal {
                TotalPrice = calculatedData.CalculateProductsTotal()
            };

            var response = _mapService.MapCalculatedOrder(calculatedData);
            return new Response<CalculatedOrderResponse>(ResponseStatus.Ok, response);
        }
    }
}
