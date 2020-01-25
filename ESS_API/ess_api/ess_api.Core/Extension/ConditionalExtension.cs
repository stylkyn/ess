using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Extension
{
    public static class ConditionalExtension
    {
        public static bool IsEmpty(this string any)
        {
            return any == null;
        }
    }
}
