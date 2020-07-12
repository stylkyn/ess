using ess_api.Core.Extension;
using ess_api.Core.Model;
using Libraries.AssetsFile;
using Libraries.DocumentHtml.Abstraction;
using Libraries.DocumentHtml.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Libraries.DocumentHtml.Repositories
{
    public class DocumentInvoiceRepository : IDocumentInvoiceRepository
    {
        private readonly IDocumentHtmlLibrary _documentHtmlLibrary;

        private const string LogoUrl = "https://res.cloudinary.com/dbvpy37t8/image/upload/v1594568075/system/htmlTemplates/xs05osnn68mshlbgnzwk.png";

        public DocumentInvoiceRepository()
        {
            _documentHtmlLibrary = new DocumentHtmlLibrary();
        }

        public FileResult GenerateInvoice(OrderModel order)
        {
            string html = AssetsFileLibrary.GetInvoiceTemplate();
            var invoiceTemplate = new InvoiceTemplateModel
            {
                CreatedDateLabel = "Datum vystavení:",
                DueDateLabel = "Datum splatnosti:",
                PriceWithoutVatLabel = "Cena bez DPH",
                PriceWithVatLabel = "Cena s DPH",
                TotalPriceLabel = "Cena celkem s DPH",
                VatLabel = "DPH",
                InvoiceLabel = "Faktura",
                ItemsLabel = "Položky",
                Supplier = @"Hradištská 216
                            688 01 Uherský Brod
                            IČ: 29032393
                            DIČ: CZ29032393",
                PaymentInfo = $@"Bankovní účet: 1111111111/0080
                                Variabilní symbol: {order.OrderNumber}
                                Způsob platby: {order.CalculatedData.Payment.Name}"
            };

            // base
            html = InsertValue(html, "logoUrl", LogoUrl);
            html = InsertValue(html, "supplier", invoiceTemplate.Supplier);
            html = InsertValue(html, "paymentInfo", invoiceTemplate.PaymentInfo);
            // labels
            html = InsertValue(html, "invoiceLabel", invoiceTemplate.InvoiceLabel);
            html = InsertValue(html, "itemsLabel", invoiceTemplate.ItemsLabel);
            html = InsertValue(html, "priceWithVatLabel", invoiceTemplate.PriceWithVatLabel);
            html = InsertValue(html, "priceWithoutVatLabel", invoiceTemplate.PriceWithoutVatLabel);
            html = InsertValue(html, "vatLabel", invoiceTemplate.VatLabel);
            html = InsertValue(html, "totalPriceLabel", invoiceTemplate.TotalPriceLabel);
            html = InsertValue(html, "createdDateLabel", invoiceTemplate.CreatedDateLabel);
            html = InsertValue(html, "dueDateLabel", invoiceTemplate.DueDateLabel);
            // values
            html = InsertValue(html, "invoiceNumber", order.OrderNumberFormatted);
            html = InsertValue(html, "createdDate", order.CreatedDate.ToString("d.M.yyyy"));
            html = InsertValue(html, "dueDate", order.CreatedDate.AddDays(14).ToString("d.M.yyyy"));

            html = InsertValue(html, "customerNameLine", order.Customer.GetName());
            html = InsertValue(html, "customerStreetLine", order.Customer.GetAddress().GetStreetLine());
            html = InsertValue(html, "customerCityLine", order.Customer.GetAddress().GetCityLine());

            html = InsertValue(html, "totalPrice", order.CalculatedData.Total.TotalPrice.CzkWithVat.ToStringPriceFormat());

            string items = "";
            // generate all products
            if (order.CalculatedData != null)
            {
                List<string> products = order.CalculatedData.Products
                    .Select(x =>
                        GenerateProductItem(
                            x.Count,
                            x.Product.Name,
                            x.TotalPrice))
                    .ToList();
                items += string.Join(string.Empty, products);
            }
            // add payment method to items
            if (order.Payment != null)
                items += GenerateInvoiceItem(order.CalculatedData.Payment.Name, order.CalculatedData.Payment.TotalPrice);
            // add transport to items
            if (order.Transport != null)
                items += GenerateInvoiceItem(order.CalculatedData.Transport.Name, order.CalculatedData.Transport.TotalPrice);

            html = InsertValue(html, "items", items);

            FileResult result = _documentHtmlLibrary.HtmlToFile(html, $"faktura_{order.OrderNumberFormatted}.pdf");

            return result;
        }

        private string GenerateProductItem(int productCount, string productName, Price price)
        {
            if (price == null) return null;

            string item = $@"<tr class=""item"">
                <td>{productCount}x {productName}</td>
                <td>{price.CzkWithoutVat.ToStringPriceFormat()} Kč</td>
                <td>{price.VatPercentage}%</td>
                <td>{price.CzkWithVat.ToStringPriceFormat()} Kč</td>
            </tr>";
            return item;
        }

        private string GenerateInvoiceItem(string itemName, Price price)
        {
            if (price == null) return null;

            string item = $@"<tr class=""item"">
                <td>{itemName}</td>
                <td>{price.CzkWithoutVat.ToStringPriceFormat()} Kč</td>
                <td>{price.VatPercentage}%</td>
                <td>{price.CzkWithVat.ToStringPriceFormat()} Kč</td>
            </tr>";
            return item;
        }

        private static string InsertValue(string htmlTemplate, string key, string value)
        {
            return htmlTemplate.Replace($"[[{key}]]", value);
        }
    }
}
