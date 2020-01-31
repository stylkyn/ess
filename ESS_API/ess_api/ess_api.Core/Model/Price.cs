namespace ess_api.Core.Model
{
    public class Price
    {
        public decimal CzkWithoutVat { get; }
        public decimal CzkWithVat { get; }
        public int VatPercentage { get; }
        public VatTypes VatType { get; }
        public PriceTypes PriceType { get; }

        public Price (decimal czkWithoutVat, VatTypes vaType = VatTypes.Czk21, PriceTypes priceType = PriceTypes.CzkPerHour)
        {
            int vatPecentage = GetVatPercentage(vaType);
            VatPercentage = vatPecentage;
            CzkWithoutVat = czkWithoutVat;
            CzkWithVat = czkWithoutVat * (1 + (vatPecentage / 100.0M));
            VatType = vaType;
            PriceType = priceType;
        }

        private int GetVatPercentage(VatTypes vatType)
        {
            switch (vatType)
            {
                case VatTypes.Czk0:
                    return 0;
                case VatTypes.Czk10:
                    return 10;
                case VatTypes.Czk15:
                    return 15;
                case VatTypes.Czk21:
                    return 21;
            }
            return 21;
        }
    }

    public enum VatTypes
    {
        Czk0,
        Czk10,
        Czk15,
        Czk21,
    }

    public enum PriceTypes
    {
        Czk,
        CzkPerHour,
        CzkPerDay,
    }
}
