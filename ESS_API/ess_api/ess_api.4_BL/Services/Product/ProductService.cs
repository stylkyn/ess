using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Extension;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
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
            string categoryId = request.CategoryId;
            if (categoryId.IsEmpty())
            {
                var category = await _uow.Categories.FindManyAsync(x => x.UrlName == request.CategoryUrlName);
                categoryId = category.FirstOrDefault()?.Id.ToString();
            }

            var Products = await _uow.Products.Search(categoryId);
            return new ResponseList<ProductResponse>(ResponseStatus.Ok, MapProducts(Products.ToList()));
        }

        public async Task<Response<ProductResponse>> Get(string Id)
        {
            var Product = await _uow.Products.FindAsync(new Guid(Id));
            return new Response<ProductResponse>(ResponseStatus.Ok, MapProduct(Product));
        }

        /*
         *  SET
         * **/
        public async Task<Response> Add(ProductRequest request)
        {
            var product = new ProductModel
            {
                CategoryId = request.CategoryId,
                Name = request.Name,
                Description = request.Description,
                PreviewDescription = request.PreviewDescription,
                Price = request.Price,
                UrlName = WebUtility.UrlEncode(request.UrlName)
            };
            await _uow.Products.InsertAsync(product);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Update(ProductRequest request)
        {
            var product = _uow.Products.Find(new Guid(request.Id));

            product.CategoryId = request.CategoryId;
            product.Name = request.Name;
            product.UrlName = WebUtility.UrlEncode(request.UrlName);
            product.Description = request.Description;
            product.PreviewDescription = request.PreviewDescription;
            product.Price = request.Price;

            await _uow.Products.ReplaceAsync(product.Id, product);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Remove(string id)
        {
            await _uow.Products.DeleteAsync(new Guid(id));
            return new Response(ResponseStatus.Ok);
        }

        private ProductResponse MapProduct(ProductModel product)
        {
            return new ProductResponse
            {
                Id = product.Id.ToString(),
                Name = product.Name,
                UrlName = product.UrlName,
                PreviewDescription = product.PreviewDescription,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId
            };
        }

        private List<ProductResponse> MapProducts(List<ProductModel> product)
        {
            return product.Select(x => MapProduct(x)).ToList();
        }
    }
}
