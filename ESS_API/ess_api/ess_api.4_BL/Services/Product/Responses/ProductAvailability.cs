using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Product.Responses
{
    public class ProductAvailabilityResponse : ResponseData
    {
        [JsonProperty("day")]
        public DateTime Day { get; set; }

        [JsonProperty("FreeCapacity")]
        public int FreeCapacity { get; set; }
    }
}
