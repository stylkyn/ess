using ess_api._4_BL.Services.Order;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared;
using ess_api.Core.Extension;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Product
{
    public class ProductSharedService : MainService
    {
        /*
         * GET
         * **/
        public async Task<List<ProductModel>> GetSelected(List<string> productsIds)
        {
            if (productsIds.Count == 0)
             return new List<ProductModel>();

            var requestGuids = productsIds.Select(x => new Guid(x));
            var products = await _uow.Products.FindManyAsync(x => requestGuids.Contains(x.Id));
            return products.ToList();
        }

        public async Task<List<ProductAvailability>> GetProductAvailabilities(ProductModel product)
        {
            DateTime startDate = DateTime.Now;
            DateTime endDate = startDate.AddMonths(1);
            var dates = Enumerable.Range(0, 1 + endDate.Subtract(startDate).Days)
                .Select(offset => startDate.AddDays(offset))
                .ToList();

            if (product.Servis != null)
            {
                // TODO: move max services to MondoDB, set per day for all next 30 days
                int maxServicesInDay = 8;
                var orders = await _uow.Orders.FindManyAsync(x => x.Service != null);

                return dates.Select(day => {
                    int freeCapacity = maxServicesInDay - orders.Where(o => o.CreatedDate.Date == day.Date).Count();
                    return new ProductAvailability
                    {
                        Day = day,
                        FreeCapacity = freeCapacity >= 0 ? freeCapacity : 0
                    };
                }).ToList();
            }
            if (product.Deposit != null)
            {
                // TODO Move orders products to Mongo DB - productModel, add product count system
                var invalidDates = GetInvalidReservationDates(product);
                return dates.Select(day => new ProductAvailability
                {
                    Day = day,
                    FreeCapacity = invalidDates.Any(invalidDate => invalidDate.Date == day.Date) ? 0 : 1
                }).ToList();
            }
            return new List<ProductAvailability>();
        }

        private List<DateTime> GetInvalidReservationDates(ProductModel product, int orderProductsCount = 1)
        {
            DateTime today = DateTime.Today;
            var productTotalCount = product.Deposit.SerialProduct.Count();
            var reservationsFlat = product.Deposit.SerialProduct.SelectMany(sp =>
                sp.Reservations
                    .Where(r => r.DateTo.Date >= today.Date)
                    .Select(r => new
                    {
                        r.DateFrom,
                        r.DateTo,
                        sp.ProductNumber
                    }));

            if (reservationsFlat.Count() == 0)
                return new List<DateTime>();

            DateTime maxDate = reservationsFlat.Max(x => x.DateTo);
            DateTime minDate = reservationsFlat.Min(x => x.DateFrom);
            if (minDate < today)
                minDate = today;

            var daysInRange = minDate.GetDaysInRange(maxDate);
            var invalidDays = daysInRange.Where(day => (productTotalCount - reservationsFlat.Where(r => r.DateFrom < day && day < r.DateTo).Count()) >= orderProductsCount);

            return invalidDays.ToList();
        }

        /*
         * SET
         * **/

        public async Task<ProductModel> Update(ProductModel product)
        {
            if (product == null)
                return null;

            var response = await _uow.Products.FindAndReplaceAsync(product.Id, product);
            return response;
        }
    }
}
