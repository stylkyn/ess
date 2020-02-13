using System;
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
        public string PreviewImageUrl { get; set; }
        public List<string> Gallery { get; set; } = new List<string>();
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string Description { get; set; }
        public string CategoryId { get; set; }

        public ProductDeposit Deposit { get; set; } = null;
        public ProductBuy Buy { get; set; } = null;
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
}
