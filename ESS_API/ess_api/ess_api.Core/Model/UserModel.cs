using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class UserModel : BaseModel
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
    }
}
