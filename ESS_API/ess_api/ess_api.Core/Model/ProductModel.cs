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
        public List<string> Gallery { get; set; }
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string Description { get; set; }
        public string CategoryId { get; set; }

        public ProductDeposit Deposit { get; set; }
        public ProductBuy Buy { get; set; }
    }

    public class ProductDeposit
    {
        public Price Price { get; set; } // price per day
        public Price Deposit { get; set; }
    }

    public class ProductBuy
    {
        public Price Price { get; set; }
    }

    public enum ProductType
    {
        Deposit,
        Buy
    }

}
