namespace ess_api.Core.Model
{
    public class PaymentModel : BaseModel
    {
        public PaymentType Type { get; set; }
        // is visible for customers
        public bool IsActive { get; set; } = true;
        public Image Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Price TotalPrice { get; set; } = new Price(0.0M);
    }

    public enum PaymentType
    {
        CashOnDelivery, // Dobirka
        CashOnPlace, // Platba pri prevzeti
        PaymentOrder // Platebni prikaz
    }
}
