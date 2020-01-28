using ess_api.Core.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api._4_BL.Shared.Responses
{
    public class PriceResponse
    {
        [JsonProperty("czkWithoutVat")]
        public decimal CzkWithoutVat { get; set; }

        [JsonProperty("czkWithVat")]
        public decimal CzkWithVat { get; set; }

        [JsonProperty("vatPercentage")]
        public int VatPercentage { get; set; }

        [JsonProperty("vatType")]
        public VatTypes VatType { get; set; }

        [JsonProperty("priceType")]
        public PriceTypes PriceType { get; set; }
    }
}
