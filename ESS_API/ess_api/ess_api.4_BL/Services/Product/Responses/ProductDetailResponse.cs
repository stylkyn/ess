using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Product.Responses
{
    public class ProductDetailResponse : ResponseData
    {
        [JsonProperty("previewName")]
        public string PreviewName { get; set; }

        [JsonProperty("previewDescription")]
        public string PreviewDescription { get; set; }

        [JsonProperty("previewImageUrl")]
        public string PreviewImageUrl { get; set; }

        [JsonProperty("gallery")]
        public List<string> Gallery { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("urlName")]
        public string UrlName { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("categoryId")]
        public string CategoryId { get; set; }

        [JsonProperty("deposit")]
        public ProductDetailDepositResponse Deposit { get; set; }

        [JsonProperty("buy")]
        public ProductDetailBuyResponse Buy { get; set; }
    }

    public class ProductDetailDepositResponse
    {
        [JsonProperty("price")]
        public PriceResponse Price { get; set; } // price per Deposit 

        [JsonProperty("depositValue")]
        public PriceResponse DepositValue { get; set; } // deposit value

        public List<DateTime> InvalidDays { get; set; } // blocked days
    }

    public class ProductDetailBuyResponse
    {
        [JsonProperty("price")]
        public PriceResponse Price { get; set; }
    }
}
