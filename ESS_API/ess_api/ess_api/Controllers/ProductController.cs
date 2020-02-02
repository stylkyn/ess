﻿using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Products")]
    public class ProductsController : BaseApiController
    {
        private ProductService _productService;

        public ProductsController()
        {
            _productService = new ProductService();
        }

        // GET: api/Products/Search
        [HttpGet]
        [Route("Search")]
        public async Task<IHttpActionResult> Search([FromUri] ProductSearchRequest request)
        {
            var response = await _productService.Search(request);
            return new CreateResult(response);
        }

        // GET: api/Products/5
        public async Task<IHttpActionResult> Get(string Id)
        {
            var response = await _productService.Get(Id);
            return new CreateResult(response);
        }


        // GET: api/categories/GetByUrl
        [HttpGet]
        [Route("GetByUrl")]
        public async Task<IHttpActionResult> GetByUrl([FromUri] string urlName)
        {
            var response = await _productService.GetByUrl(urlName);
            return new CreateResult(response);
        }

        // PUT: api/Products
        [HttpPut]
        public async Task<IHttpActionResult> Put([FromBody]ProductRequest Product)
        {
            var response = await _productService.Update(Product);
            return new CreateResult(response);
        }

        // POST: api/Products
        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody]ProductRequest Product)
        {
            var response = await _productService.Add(Product);
            return new CreateResult(response);
        }

        // DELETE: api/Products/5
        public async Task<IHttpActionResult> Delete(string Id)
        {
            var response = await _productService.Remove(Id);
            return new CreateResult(response);
        }
    }
}