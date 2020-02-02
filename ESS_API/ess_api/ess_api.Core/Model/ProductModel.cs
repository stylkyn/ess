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
    }

    public class ProductBuy
    {
        public Price Price { get; set; }
    }
}
