using ess_api.Core.Model;
using System.Collections.Generic;
using System.Linq;

namespace ess_api._4_BL.Services.Order.Model
{
    public class CalculatedOrder
    {
        public List<CalculatedOrderProduct> Products { get; set; } = new List<CalculatedOrderProduct>();
        public CalculatedOrderTotal Total { get; set; }

        public Price CalculateProductsTotal()
        {
            decimal czkWithoutVat = Products.Sum(p => p.CalculateTotal().CzkWithoutVat);
            decimal czkWithVat = Products.Sum(p => p.CalculateTotal().CzkWithVat);
            return new Price(czkWithoutVat, czkWithVat);
        }
    }

    public class CalculatedOrderProduct
    {
        public ProductModel Product { get; set; }
        public int Count { get; set; }
        public Price TotalPrice { get; set; }

        public Price CalculateTotal()
        {
            return Product.Buy.Price * Count;
        }
    }

    public class CalculatedOrderTotal
    {
        public Price TotalPrice;
    }
}
