using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model.Shared
{
    public class ProductAvailability
    {
        public DateTime Day { get; set; }
        public int FreeCapacity { get; set; }
    }
}
