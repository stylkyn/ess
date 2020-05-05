using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Services.Stats.Responses;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Stats
{
    public class StatsService : MainService
    {
        public async Task<Response<StatsResponse>> GetStats(Request request)
        {
            var result = new StatsModel();
            var orders = await _uow.Orders.FindManyAsync();

            // set profit stats
            result.Profits = orders
                .GroupBy(x => new { x.CreatedDate.Year, x.CreatedDate.Month })
                .Select(g => new StatsProfit {
                    YearNumber = g.Key.Year,
                    MonthNumber = g.Key.Month,
                    MonthName = new DateTime(g.Key.Year, g.Key.Month, 1).ToString("MMMM", CultureInfo.GetCultureInfo("cs")),
                    ProfitTotal = new Price(g.Sum(p => p.CalculatedData.Total.TotalPrice.CzkWithoutVat), VatTypes.Czk21, PriceTypes.Czk),
                    SalesCount = g.Count()
                })
                .OrderByDescending(x => x.YearNumber)
                .ThenBy(x => x.MonthNumber)
                .Take(12)
                .Reverse()
                .ToList();
            return new Response<StatsResponse>(ResponseStatus.Ok, _mapService.MapStats(result));
        }

    }
}
