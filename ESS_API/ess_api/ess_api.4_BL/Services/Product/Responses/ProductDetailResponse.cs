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

        [JsonProperty("type")]
        public ProductType Type { get; set; }

        [JsonProperty("previewDescription")]
        public string PreviewDescription { get; set; }

        [JsonProperty("image")]
        public ImageResponse Image { get; set; }

        [JsonProperty("gallery")]
        public List<ImageResponse> Gallery { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("isActive")]
        public bool IsActive { get; set; }

        [JsonProperty("urlName")]
        public string UrlName { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("categoryId")]
        public string CategoryId { get; set; }

        [JsonProperty("deposit")]
        public ProductDetailDepositResponse Deposit { get; set; }

        [JsonProperty("service")]
        public ProductDetailServiceResponse Service { get; set; }

        [JsonProperty("buy")]
        public ProductDetailBuyResponse Buy { get; set; }

        [JsonProperty("stock")]
        public ProductDetailStockResponse Stock { get; set; }
    }

    public class ProductDetailStockResponse
    {
        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("preOrderDays")]
        public int PreOrderDays { get; set; }
    }

    public class ProductDetailServiceResponse
    {
        [JsonProperty("price")]
        public PriceResponse Price { get; set; }

        [JsonProperty("availabilities")]
        public List<ProductAvailabilityResponse> Availabilities { get; set; }
    }

    public class ProductDetailDepositResponse
    {
        [JsonProperty("price")]
        public PriceResponse Price { get; set; } // price per Deposit 

        [JsonProperty("depositValue")]
        public PriceResponse DepositValue { get; set; } // deposit value

        [JsonProperty("availabilities")]
        public List<ProductAvailabilityResponse> Availabilities { get; set; } // available days
    }

    public class ProductDetailBuyResponse
    {
        [JsonProperty("price")]
        public PriceResponse Price { get; set; }
    }
}
