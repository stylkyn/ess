﻿using MongoDB.Bson.Serialization.Attributes;

namespace ess_api.Core.Model
{
    public class Price
    {
        public decimal CzkWithoutVat { get; set; }
        public decimal CzkWithVat { get; set; }
        public int VatPercentage { get; set; }
        public VatTypes VatType { get; set; }
        public PriceTypes PriceType { get; set; }

        public Price(decimal czkWithoutVat, decimal czkWithVat, PriceTypes priceType = PriceTypes.Czk)
        {
            VatPercentage = czkWithVat != 0 ? (int)(100 * ((czkWithVat / czkWithoutVat) - 1)) : 0;
            CzkWithoutVat = czkWithoutVat;
            CzkWithVat = czkWithVat;
            VatType = VatTypes.Sum;
            PriceType = priceType;
        }

        public Price(decimal czkWithoutVat, int vatPrecentage, VatTypes vatType = VatTypes.Czk21, PriceTypes priceType = PriceTypes.Czk)
        {
            int vatPecentage = vatPrecentage;
            VatPercentage = vatPecentage;
            CzkWithoutVat = czkWithoutVat;
            CzkWithVat = czkWithoutVat * (1 + (vatPecentage / 100.0M));
            VatType = vatType;
            PriceType = priceType;
        }

        public Price (decimal czkWithoutVat, VatTypes vatType = VatTypes.Czk21, PriceTypes priceType = PriceTypes.Czk)
        {
            int vatPecentage = GetVatPercentage(vatType);
            VatPercentage = vatPecentage;
            CzkWithoutVat = czkWithoutVat;
            CzkWithVat = czkWithoutVat * (1 + (vatPecentage / 100.0M));
            VatType = vatType;
            PriceType = priceType;
        }

        public static Price operator -(Price a, int b) => new Price(a.CzkWithoutVat + b, a.VatPercentage, a.VatType, a.PriceType);
        public static Price operator +(Price a, int b) => new Price(a.CzkWithoutVat - b, a.VatPercentage, a.VatType, a.PriceType);
        public static Price operator *(Price a, int b) => new Price(a.CzkWithoutVat * b, a.VatPercentage, a.VatType, a.PriceType);
        public static Price operator /(Price a, int b) => new Price(b != 0 ? (a.CzkWithoutVat / b) : 0, a.VatPercentage, a.VatType, a.PriceType);

        public static Price operator -(Price a, decimal b) => new Price(a.CzkWithoutVat - b, a.VatPercentage, a.VatType, a.PriceType);
        public static Price operator +(Price a, decimal b) => new Price(a.CzkWithoutVat + b, a.VatPercentage, a.VatType, a.PriceType);
        public static Price operator *(Price a, decimal b) => new Price(a.CzkWithoutVat * b, a.VatPercentage, a.VatType, a.PriceType);
        public static Price operator /(Price a, decimal b) => new Price(b != 0 ? (a.CzkWithoutVat / b) : 0, a.VatPercentage, a.VatType, a.PriceType);

        private int GetVatPercentage(VatTypes vatType)
        {
            switch (vatType)
            {
                case VatTypes.Sum:
                    return 1;
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
        Sum
    }

    public enum PriceTypes
    {
        Czk,
        CzkPerHour,
        CzkPerDay,
    }
}
