using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var Products = await _uow.Products.Search(request.CategoryId);
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
        public async Task<Response> Add(ProductRequest Product)
        {
            await _uow.Products.InsertAsync(Product);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Update(ProductRequest Product)
        {
            await _uow.Products.ReplaceAsync(Product.Id, Product);
            return new Response(ResponseStatus.Ok);
        }

        public async Task<Response> Remove(string id)
        {
            await _uow.Products.DeleteAsync(new Guid(id));
            return new Response(ResponseStatus.Ok);
        }

        private ProductResponse MapProduct(ProductModel Product)
        {
            return new ProductResponse
            {
                Id = Product.Id.ToString(),
                Name = Product.Name,
                PreviewDescription = Product.PreviewDescription,
                Description = Product.Description,
                Price = Product.Price,
                CategoryId = Product.CategoryId
            };
        }

        private List<ProductResponse> MapProducts(List<ProductModel> Products)
        {
            return Products.Select(x => MapProduct(x)).ToList();
        }
    }
}
