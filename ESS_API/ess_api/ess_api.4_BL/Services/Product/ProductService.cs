using ess_api._4_BL.Services.Order;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared;
using ess_api.Core.Constant;
using ess_api.Core.Extension;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Product
{
    public class ProductService : MainService
    {
        /*
         * GET
         * **/
        public async Task<ResponseList<ProductResponse>> SearchExtend(ProductSearchExtendRequest request)
        {
            int skip = request.PageNumber * request.PageSize;
            (var products, int total) = await _uow.Products.SearchExtend(request.CategoryId, request.FullText, request.ProductType, skip, request.PageSize);
            if (products == null)
                return new ResponseList<ProductResponse>(ResponseStatus.NotFound, null, ResponseMessages.NotFound);

            return new ResponseList<ProductResponse>(ResponseStatus.Ok, _mapService.MapProducts(products), total);
        }

        public async Task<ResponseList<ProductResponse>> Search(ProductSearchRequest request)
        {
            var products = new List<ProductModel>();
            // get all products 
            if (request.CategoryUrlName.IsEmpty() && request.CategoryId.IsEmpty()) {
                products = await _uow.Products.Search();
                return new ResponseList<ProductResponse>(ResponseStatus.Ok, _mapService.MapProducts(products.ToList()));
            }

            // get product by Id/UrlName
            string categoryId = request.CategoryId;
            if (request.CategoryId.IsEmpty())
            {
                var category = await _uow.Categories.FindManyAsync(x => x.UrlName == request.CategoryUrlName);
                categoryId = category.FirstOrDefault()?.Id.ToString();
            }

            // get child categories
            var categories = (await _uow.Categories.FindManyAsync(x => x.ParentCategoryId == categoryId))
                .Select(x => x.Id.ToString())
                .ToList();
            categories.Add(categoryId);


            products = await _uow.Products.Search(categories);
            return new ResponseList<ProductResponse>(ResponseStatus.Ok, _mapService.MapProducts(products.ToList()));
        }

        public async Task<Response<ProductDetailResponse>> GetByUrl(GetProductDetailByUrlRequest request)
        {
            var products = await _uow.Products.FindManyAsync(x => x.UrlName == request.UrlName);
            if (products.IsEmpty())
                return new Response<ProductDetailResponse>(ResponseStatus.NotFound, null, $"Product with urlName: {request.UrlName} was not founded");

            var product = products.First();
            if (product.Deposit != null)
            {
                var invalidDays = GetInvalidReservationDates(product);
                return new Response<ProductDetailResponse>(ResponseStatus.Ok, MapProductDetail(product, invalidDays.ToList()));
            }
            return new Response<ProductDetailResponse>(ResponseStatus.Ok, MapProductDetail(product));
        }

        public async Task<Response<ProductDetailResponse>> Get(GetProductDetailRequest request)
        {
            var product = await _uow.Products.FindAsync(new Guid(request.ProductId));
            if (product == null)
                return new Response<ProductDetailResponse>(ResponseStatus.NotFound, null, $"Product with id: {request.ProductId} was not founded");


            if (product.Deposit != null)
            {
                var invalidDays = GetInvalidReservationDates(product, request.OrderProductsCount);
                return new Response<ProductDetailResponse>(ResponseStatus.Ok, MapProductDetail(product, invalidDays.ToList()));
            }
            return new Response<ProductDetailResponse>(ResponseStatus.Ok, MapProductDetail(product));
        }

        /*
         *  SET
         * **/
        public async Task<Response<ProductResponse>> Add(ProductRequest request)
        {
            var product = new ProductModel
            {
                CategoryId = request.CategoryId,
                Name = request.Name,
                Description = request.Description,
                PreviewName = request.PreviewName,
                Image = request.Image,
                Gallery = request.Gallery,
                PreviewDescription = request.PreviewDescription,
                UrlName = WebUtility.UrlEncode(request.UrlName),
            };

            switch (request.Type)
            {
                case ProductType.Buy:
                    product.Buy = request.Buy != null ? new ProductBuy
                    {
                        Price = new Price(request.Buy.PriceWithoutVat)
                    } : null;
                    break;
                case ProductType.Servis:
                    product.Servis = request.Servis != null ? new ProductServis
                    {
                        Price = new Price(request.Servis.PriceWithoutVat, VatTypes.Czk21, PriceTypes.Czk),
                        ServisDate = request.Servis.ServisDate
                    } : null;
                    break;
                case ProductType.Deposit:
                    product.Deposit = request.Deposit != null ? new ProductDeposit
                    {
                        Price = new Price(request.Deposit.PriceWithoutVat, VatTypes.Czk21, PriceTypes.CzkPerDay),
                        DepositValue = new Price(request.Deposit.DepositValue, VatTypes.Czk0)
                    } : null;
                    break;
            }

            await _uow.Products.InsertAsync(product);
            return new Response<ProductResponse>(ResponseStatus.Ok, _mapService.MapProduct(product));
        }

        public async Task<Response<ProductResponse>> Update(ProductRequest request)
        {
            var product = await _uow.Products.FindAsync(new Guid(request.Id));
            if (product == null)
                return new Response<ProductResponse>(ResponseStatus.NotFound, null, $"Product with id: {request.Id} was not founded");

            product.CategoryId = request.CategoryId;
            product.Name = request.Name;
            product.UrlName = WebUtility.UrlEncode(request.UrlName);
            product.Description = request.Description;
            product.PreviewDescription = request.PreviewDescription;
            product.PreviewName = request.PreviewName;
            product.Image = request.Image;
            product.Gallery = request.Gallery;

            switch (request.Type)
            {
                case ProductType.Buy:
                    product.Buy = request.Buy != null ? new ProductBuy
                    {
                        Price = new Price(request.Buy.PriceWithoutVat)
                    } : null;
                    break;
                case ProductType.Servis:
                    product.Servis = request.Servis != null ? new ProductServis
                    {
                        Price = new Price(request.Servis.PriceWithoutVat, VatTypes.Czk21, PriceTypes.Czk),
                        ServisDate = request.Servis.ServisDate
                    } : null;
                    break;
                case ProductType.Deposit:
                    product.Deposit = request.Deposit != null ? new ProductDeposit
                    {
                        Price = new Price(request.Deposit.PriceWithoutVat, VatTypes.Czk21, PriceTypes.CzkPerDay),
                        DepositValue = new Price(request.Deposit.DepositValue, VatTypes.Czk0)
                    } : null;
                    break;
            }
            var response = await _uow.Products.FindAndReplaceAsync(product.Id, product);
            return new Response<ProductResponse>(ResponseStatus.Ok, _mapService.MapProduct(response));
        }

        public async Task<Response> Remove(ProductRemoveRequest request)
        {
            await _uow.Products.DeleteAsync(new Guid(request.Id));
            return new Response(ResponseStatus.Ok);
        }

        /*
         *  PRIVATE
         * **/

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

        // MAPPING
        // -------
        private ProductDetailResponse MapProductDetail (ProductModel request, List<DateTime> invaliDates = null)
        {
            return new ProductDetailResponse
            {
                Id = request.Id.ToString(),
                Name = request.Name,
                UrlName = request.UrlName,
                PreviewName = request.PreviewName,
                PreviewDescription = request.PreviewDescription,
                Image = request.Image,
                Description = request.Description,
                CategoryId = request.CategoryId,
                Gallery = request.Gallery,
                Buy = request.Buy != null ? new ProductDetailBuyResponse
                {
                    Price = SharedMapService.MapPrice(request.Buy.Price),
                } : null,
                Deposit = request.Deposit != null ? new ProductDetailDepositResponse
                {
                    DepositValue = SharedMapService.MapPrice(request.Deposit.DepositValue),
                    Price = SharedMapService.MapPrice(request.Deposit.Price),
                    InvalidDays = invaliDates
                } : null,
            };
        }
    }
}
