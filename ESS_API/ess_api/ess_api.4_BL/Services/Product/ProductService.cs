using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared;
using ess_api.Core.Extension;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services
{
    public class ProductService : MainService
    {

        /*
         * GET
         * **/
        public async Task<ResponseList<ProductResponse>> Search(ProductSearchRequest request)
        {
            var products = new List<ProductModel>();
            // get all products 
            if (request.CategoryUrlName.IsEmpty() && request.CategoryId.IsEmpty()) {
                products = await _uow.Products.Search();
                return new ResponseList<ProductResponse>(ResponseStatus.Ok, MapProducts(products.ToList()));
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
            return new ResponseList<ProductResponse>(ResponseStatus.Ok, MapProducts(products.ToList()));
        }

        public async Task<Response<ProductResponse>> GetByUrl(string urlName)
        {
            var products = await _uow.Products.FindManyAsync(x => x.UrlName == urlName);
            if (products.IsEmpty())
                return new Response<ProductResponse>(ResponseStatus.NotFound, null, $"Product with urlName: {urlName} was not founded");

            var response = products.FirstOrDefault();
            return new Response<ProductResponse>(ResponseStatus.Ok, MapProduct(response));
        }

        public async Task<Response<ProductResponse>> Get(string Id, int productsCountToOrder = 1)
        {
            var product = await _uow.Products.FindAsync(new Guid(Id));

            if (product.Deposit != null)
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

                DateTime maxDate = reservationsFlat.Max(x => x.DateTo);
                DateTime minDate = reservationsFlat.Min(x => x.DateFrom);
                if (minDate < today)
                    minDate = today;

                var daysInRange = minDate.GetDaysInRange(maxDate);
                var invalidDays = daysInRange.Where(day => (productTotalCount - reservationsFlat.Where(r => r.DateFrom < day && day < r.DateTo).Count()) >= productsCountToOrder);
                // mapping product object with invalidDays to Response objecct
            }

            return new Response<ProductResponse>(ResponseStatus.Ok, MapProduct(product));
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
                PreviewImageUrl = request.PreviewImageUrl,
                Gallery = request.Gallery,
                PreviewDescription = request.PreviewDescription,
                UrlName = WebUtility.UrlEncode(request.UrlName),
                Buy = request.Buy != null ? new ProductBuy
                {
                    Price = new Price(request.Buy.PriceWithouVat)
                } : null,
                Deposit = request.Deposit != null ? new ProductDeposit
                {
                    Price = new Price(request.Deposit.PriceWithouVat, VatTypes.Czk21, PriceTypes.CzkPerDay),
                    DepositValue = new Price(request.Deposit.DepositValue, VatTypes.Czk0)
                } : null
            };
            await _uow.Products.InsertAsync(product);
            return new Response<ProductResponse>(ResponseStatus.Ok, MapProduct(product));
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
            product.PreviewImageUrl = request.PreviewImageUrl;
            product.Gallery = request.Gallery;
            product.Buy = request.Buy != null ? new ProductBuy
            {
                Price = new Price(request.Buy.PriceWithouVat)
            } : null;
            product.Deposit = request.Deposit != null ? new ProductDeposit
            {
                Price = new Price(request.Deposit.PriceWithouVat, VatTypes.Czk21, PriceTypes.CzkPerDay),
                DepositValue = new Price(request.Deposit.DepositValue, VatTypes.Czk0)
            } : null;

            var response = await _uow.Products.FindAndReplaceAsync(product.Id, product);
            return new Response<ProductResponse>(ResponseStatus.Ok, MapProduct(response));
        }

        public async Task<Response> Remove(string id)
        {
            await _uow.Products.DeleteAsync(new Guid(id));
            return new Response(ResponseStatus.Ok);
        }

        private ProductResponse MapProduct(ProductModel request)
        {
            return new ProductResponse
            {
                Id = request.Id.ToString(),
                Name = request.Name,
                UrlName = request.UrlName,
                PreviewName = request.PreviewName,
                PreviewDescription = request.PreviewDescription,
                PreviewImageUrl = request.PreviewImageUrl,
                Description = request.Description,
                CategoryId = request.CategoryId,
                Gallery = request.Gallery,
                Buy = request.Buy != null ? new ProductBuyResponse
                {
                     Price = SharedMapService.MapPrice(request.Buy.Price)
                } : null,
                Deposit = request.Deposit != null ? new ProductDepositResponse
                {
                    DepositValue = SharedMapService.MapPrice(request.Deposit.DepositValue),
                    Price = SharedMapService.MapPrice(request.Deposit.Price)
                } : null,
            };
        }

        private List<ProductResponse> MapProducts(List<ProductModel> product)
        {
            return product.Select(x => MapProduct(x)).ToList();
        }
    }
}
