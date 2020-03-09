using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libraries.Authetification.Responses
{
    public class AuthentificationTokenResponse
    {
        public DateTime ExpiresDate { get; set; }
        public string Jwt { get; set; }
    }
}
