﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class ProductModel : BaseModel
    {

        public string PreviewName { get; set; }
        public string PreviewDescription { get; set; }
        public Image Image { get; set; }
        public List<Image> Gallery { get; set; } = new List<Image>();
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string Description { get; set; }
        public string CategoryId { get; set; }

        public ProductType Type { get; set; }
        public ProductDeposit Deposit { get; set; } = null;
        public ProductBuy Buy { get; set; } = null;
        public ProductServis Servis { get; set; } = null;

        public Price GetTotalPrice()
        {
            switch (Type)
            {
                case ProductType.Buy:
                    return Buy?.Price;
                case ProductType.Deposit:
                    return Deposit?.Price;
                case ProductType.Servis:
                    return Servis?.Price;
            }
            return null;
        }
    }

    public class ProductServis
    {
        public Price Price { get; set; }
    }

    public class ProductDeposit
    {
        public Price Price { get; set; } // price per Deposit 
        public Price DepositValue { get; set; } // deposit value
        public List<SerialProductDeposit> SerialProduct { get; set; } = new List<SerialProductDeposit>();
    }

    public class ProductBuy
    {
        public Price Price { get; set; }
        public List<SerialProduct> SerialProduct { get; set; } = new List<SerialProduct>();
    }

    public class SerialProduct
    {
        public string ProductNumber { get; set; }
    }

    public class SerialProductDeposit
    {
        public string ProductNumber { get; set; }
        public List<ProductSerialReservation> Reservations { get; set; } = new List<ProductSerialReservation>();
    }

    public class ProductSerialReservation
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }

    public enum ProductType
    {
        Buy,
        Servis,
        Deposit
    }
}
