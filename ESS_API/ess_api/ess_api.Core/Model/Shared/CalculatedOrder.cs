using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ess_api.Core.Model.Shared
{
    public class CalculatedOrder
    {
        public List<CalculatedOrderProduct> Products { get; set; } = new List<CalculatedOrderProduct>();
        public CalculatedOrderTransport Transport { get; set; }
        public CalculatedOrderPayment Payment { get; set; }
        public CalculatedOrderTotal Total { get; set; }

        public bool HasAllData() => Products.Count() > 0 && HasTransport() && HasPayment();
        public bool HasTransport() => Transport?.TransportId != null && Transport.SourceData != null;
        public bool HasPayment() => Payment?.PaymentId != null && Transport.SourceData != null;


        public Price CalculateTotal()
        {
            Price total = CalculateProductsTotal();
            total += Transport?.SourceData?.TotalPrice?.CzkWithoutVat ?? 0.0M;
            total += Payment?.SourceData.TotalPrice?.CzkWithoutVat ?? 0.0M;

            return total;
        }

        public Price CalculateProductsTotal()
        {
            decimal czkWithoutVat = Products.Sum(p => p.CalculateTotal().CzkWithoutVat);
            decimal czkWithVat = Products.Sum(p => p.CalculateTotal().CzkWithVat);
            return new Price(czkWithoutVat, czkWithVat);
        }
    }

    public class CalculatedOrderTransport
    {
        public string TransportId { get; set; }
        public TransportModel SourceData { get; set; }
    }

    public class CalculatedOrderPayment
    {
        public string PaymentId { get; set; }
        public PaymentModel SourceData { get; set; }
    }

    public class CalculatedOrderProduct
    {
        public ProductModel Product { get; set; }
        public int Count { get; set; }
        public Price TotalPrice { get; set; }
        // omly for product type - service
        public CalculatedOrderProductService Service { get; set; }

        public Price CalculateTotal()
        {
                VerifyAvailabiltyInStock();
            
            return Product.GetTotalPrice() * Count;
        }

        private void VerifyAvailabiltyInStock()
        {
            if (Product.Type == ProductType.Service)
                return;

            if (Count > Product.Stock.Count)
                Count = Product.Stock.Count;
        }
    }

    public class CalculatedOrderProductService {
        public DateTime? Date { get; set; }
        public string UserId { get; set; } // user agent id
        public bool Done { get; set; }
    }

    public class CalculatedOrderTotal
    {
        public Price TotalPrice;
    }
}
