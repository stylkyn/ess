using System.Collections.Generic;
using System.Dynamic;

namespace ess_api.Core.Model.Shared
{
    public class StatsModel
    {
        public List<StatsProfit> Profits { get; set; }
    }

    public class StatsProfit
    {
        public int YearNumber { get; set; }
        public int MonthNumber { get; set; }
        public string MonthName { get; set; }
        public Price ProfitTotal { get; set; }
        public int SalesCount { get; set; }
        public int UsersCount { get; set; }
    }
}
