using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class ProductModel : BaseModel
    {
        public string Name { get; set; }
        public string PreviewDescription { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public string CategoryId { get; set; }
    }
}
