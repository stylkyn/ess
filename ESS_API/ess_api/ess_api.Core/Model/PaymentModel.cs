namespace ess_api.Core.Model
{
    public class PaymentModel : BaseModel
    {
        public PaymentType Type { get; set; }
        // is visible for customers
        public bool IsActive { get; set; } = true;
        public string Name { get; set; }
        public string Description { get; set; }
        public Price TotalPrice { get; set; } = new Price(0.0M);
        public CashOnDeliveryPayment CashOnDelivery { get; set; }
        public PaymentOrder PaymentOrder { get; set; }
    }

    // Dobirka
    public class CashOnDeliveryPayment
    {
    }

    // Platebni prikaz (generovat QR code aspon)
    public class PaymentOrder
    {
        public string VariableSymbol { get; set; }
        public string ConstantSymbol { get; set; }
        public string BankAccount { get; set; }
        public string BankCode { get; set; }
    }

    // TODO: Platebni brana, Platebni tlacitka(PLATBA 24)

    public enum PaymentType
    {
        CashOnDelivery,
        PaymentOrder
    }
}
