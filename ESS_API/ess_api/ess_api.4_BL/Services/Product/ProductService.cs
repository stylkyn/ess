﻿using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared;
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

            // get child categories
            var categories = (await _uow.Categories.FindManyAsync(x => x.ParentCategoryId == categoryId))
                .Select(x => x.Id.ToString())
                .ToList();
            categories.Add(categoryId);

            var Products = await _uow.Products.Search(categories);
            return new ResponseList<ProductResponse>(ResponseStatus.Ok, MapProducts(Products.ToList()));
        }

        public async Task<Response<ProductResponse>> GetByUrl(string urlName)
        {
            var products = await _uow.Products.FindManyAsync(x => x.UrlName == urlName);
            if (products == null)
                return new Response<ProductResponse>(ResponseStatus.NotFound, null, $"Product with urlName: {urlName} was not founded");

            var response = products.FirstOrDefault();
            return new Response<ProductResponse>(ResponseStatus.Ok, MapProduct(response));
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
                PreviewName = request.PreviewName,
                PreviewImageUrl = request.PreviewImageUrl,
                Gallery = request.Gallery,
                PreviewDescription = request.PreviewDescription,
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
            product.PreviewName = request.PreviewName;
            product.PreviewImageUrl = request.PreviewImageUrl;
            product.Gallery = request.Gallery;

            await _uow.Products.ReplaceAsync(product.Id, product);
            return new Response(ResponseStatus.Ok);
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
                Gallery = request.Gallery
            };
        }

        private List<ProductResponse> MapProducts(List<ProductModel> product)
        {
            return product.Select(x => MapProduct(x)).ToList();
        }
    }
}
