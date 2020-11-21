using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Transport.Responses
{
    public class TransportResponse : ResponseData
    {
        [JsonProperty("type")]
        public TransportType Type { get; set; }

        // is visible for customers
        [JsonProperty("isActive")]
        public bool IsActive { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("image")]
        public ImageResponse Image { get; set; }

        [JsonProperty("totalPrice")]
        public PriceResponse TotalPrice { get; set; }
    }
}
