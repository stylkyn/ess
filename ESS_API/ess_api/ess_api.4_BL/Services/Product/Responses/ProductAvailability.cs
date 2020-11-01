using ess_api._4_BL.Services.Responses;
using Newtonsoft.Json;
using System;

namespace ess_api._4_BL.Services.Product.Responses
{
    public class ProductAvailabilityResponse : ResponseData
    {
        [JsonProperty("day")]
        public DateTime Day { get; set; }

        [JsonProperty("freeCapacity")]
        public int FreeCapacity { get; set; }
    }
}
