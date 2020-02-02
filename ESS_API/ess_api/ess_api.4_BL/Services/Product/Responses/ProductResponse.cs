using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Responses
{
    public class ProductResponse : ResponseData
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
        public ProductDepositResponse Deposit { get; set; }

        [JsonProperty("buy")]
        public ProductBuyResponse Buy { get; set; }
    }

    public class ProductDepositResponse
    {
        [JsonProperty("price")]
        public PriceResponse Price { get; set; } // price per Deposit 

        [JsonProperty("depositValue")]
        public PriceResponse DepositValue { get; set; } // deposit value
    }

    public class ProductBuyResponse
    {
        [JsonProperty("price")]
        public PriceResponse Price { get; set; }
    }
}
