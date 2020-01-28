using ess_api._4_BL.Shared.Responses;
using ess_api.Core.Model;

namespace ess_api._4_BL.Shared
{
    public class SharedMapService
    {
        public static PriceResponse MapPrice(Price request)
        {
            if (request == null) return null;

            return new PriceResponse
            {
                CzkWithoutVat = request.CzkWithoutVat,
                CzkWithVat = request.CzkWithVat,
                VatPercentage = request.VatPercentage,
                VatType = request.VatType,
                PriceType = request.PriceType
            };
        }
    }
}
