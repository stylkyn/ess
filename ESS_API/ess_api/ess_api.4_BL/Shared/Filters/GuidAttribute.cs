using System;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Shared.Filters
{
    public class GuidAttribute : ValidationAttribute
    {
        public GuidAttribute() {
        }

        public override bool IsValid(object value)
        {
            if (value == null) return true;

            string guidStr = value?.ToString();
            Guid guid = Guid.Empty;
            Guid.TryParse(guidStr, out guid);

            if (guid == Guid.Empty)
                return false;

            return true;
        }
    }
}