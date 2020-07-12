namespace Libraries.DocumentHtml.Models
{
    public class InvoiceTemplateModel
    {
        public string LogoUrl { get; set; }
        public string Supplier { get; set; }
        public string PaymentInfo { get; set; }

        public string InvoiceLabel { get; set; }
        public string CreatedDateLabel { get; set; }
        public string DueDateLabel { get; set; }
        public string PriceWithVatLabel { get; set; }
        public string PriceWithoutVatLabel { get; set; }
        public string VatLabel { get; set; }
        public string TotalPriceLabel { get; set; }
        public string ItemsLabel { get; set; }
    }
}
