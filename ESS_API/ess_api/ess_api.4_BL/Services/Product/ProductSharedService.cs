using ess_api._4_BL.Services.Order;
using ess_api._4_BL.Services.Product.Requests;
using ess_api._4_BL.Services.Product.Responses;
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

        /*
         *  SET
         * **/
    }
}
