using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Extension
{
    public static class DatesExtension
    {
        public static List<DateTime> GetDaysInRange(this DateTime from, DateTime to)
        {
            return Enumerable.Range(0, 1 + to.Subtract(from).Days)
                  .Select(offset => from.AddDays(offset))
                  .ToList();
        }
    }
}
