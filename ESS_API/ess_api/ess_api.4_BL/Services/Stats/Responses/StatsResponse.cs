using ess_api._4_BL.Services.Product.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Stats.Responses
{
    public class StatsResponse : ResponseData
    {
        [JsonProperty("profits")]
         public List<StatsProfitResponse> Profits { get; set; }
    }

    public class StatsProfitResponse
    {
        [JsonProperty("yearNumber")]
        public int YearNumber { get; set; }

        [JsonProperty("monthNumber")]
        public int MonthNumber { get; set; }

        [JsonProperty("monthName")]
        public string MonthName { get; set; }

        [JsonProperty("profitTotal")]
        public PriceResponse ProfitTotal { get; set; }

        [JsonProperty("salesCount")]
        public int SalesCount { get; set; }

        [JsonProperty("usersCount")]
        public int UsersCount { get; set; }
    }
}
