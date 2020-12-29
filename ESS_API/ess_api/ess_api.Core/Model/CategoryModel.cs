using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class CategoryModel : BaseModel
    {
        public string Name { get; set; }
        public string UrlName { get; set; }
        public string ParentCategoryId { get; set; }
        public bool IsActive { get; set; } = true;
        public Image Image { get; set; }
    }
}
