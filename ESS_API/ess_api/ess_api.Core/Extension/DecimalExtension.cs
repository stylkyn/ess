namespace ess_api.Core.Extension
{
    public static class DecimalExtension
    {
        public static string ToStringPriceFormat(this decimal value)
        {
            return value.ToString("0.00");
        }
    }
}
