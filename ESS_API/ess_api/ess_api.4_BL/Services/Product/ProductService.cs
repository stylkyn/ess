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
        private readonly ProductSharedService _productSharedService;

        public ProductService()
        {
            _productSharedService = new ProductSharedService();
        }

        /*
         * GET
         * **/
        public async Task<ResponseList<ProductResponse>> SearchExtend(ProductSearchExtendRequest request)
        {
            int skip = request.PageNumber * request.PageSize;
            (var products, int total) = await _uow.Products.SearchExtend(request.CategoryId, request.FullText, request.ProductType, skip, request.PageSize);
            if (products == null)
                return new ResponseList<ProductResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

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
                return new Response<ProductDetailResponse>(
                    ResponseStatus.NotFound, 
                    null, 
                    $"Product with urlName: {request.UrlName} was not founded");

            var product = products.First();
            if (product.Deposit != null || product.Servis != null)
            {
                var availabilities = await _productSharedService.GetProductAvailabilities(product);
                return new Response<ProductDetailResponse>(ResponseStatus.Ok, _mapService.MapProductDetail(product, availabilities));
            }
            return new Response<ProductDetailResponse>(ResponseStatus.Ok, _mapService.MapProductDetail(product));
        }

        public async Task<Response<ProductDetailResponse>> Get(GetProductDetailRequest request)
        {
            var product = await _uow.Products.FindAsync(new Guid(request.ProductId));
            if (product == null)
                return new Response<ProductDetailResponse>(ResponseStatus.NotFound, null, $"Product with id: {request.ProductId} was not founded");


            if (product.Deposit != null || product.Servis != null)
                {
                var availabilities = await _productSharedService.GetProductAvailabilities(product);
                return new Response<ProductDetailResponse>(ResponseStatus.Ok, _mapService.MapProductDetail(product, availabilities));
            }
            return new Response<ProductDetailResponse>(ResponseStatus.Ok, _mapService.MapProductDetail(product));
        }

        public async Task<ResponseList<ProductAvailabilityResponse>> GetProductAvailabilities(ProductAvailabilityRequest request)
        {
            var product = await _uow.Products.FindAsync(new Guid(request.ProductId));
            var availabilities = await _productSharedService.GetProductAvailabilities(product);
            return new ResponseList<ProductAvailabilityResponse>(ResponseStatus.Ok, _mapService.MapProductAvailablities(availabilities));
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
                Stock = new ProductStock
                {
                    Count = request.Stock.Count,
                    PreOrderDays = request.Stock.PreOrderDays,
                },
                Type = request.Type
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
            product.Type = request.Type;
            product.Stock.Count = request.Stock.Count;
            product.Stock.PreOrderDays = request.Stock.PreOrderDays;

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
    }
}
