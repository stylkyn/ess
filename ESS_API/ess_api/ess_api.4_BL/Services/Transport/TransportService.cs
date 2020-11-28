using ess_api._4_BL.Services.Order.Requests;
using ess_api._4_BL.Services.Order.Responses;
using ess_api._4_BL.Services.Transport.Requests;
using ess_api._4_BL.Services.Transport.Responses;
using ess_api._4_BL.Services.Responses;
using System.Linq;
using System.Threading.Tasks;
using ess_api.Core.Model;
using System;
using ess_api.Core.Constant;

namespace ess_api._4_BL.Services.Transport
{
    public class TransportService : MainService
    {
        public async Task<ResponseList<TransportResponse>> GetTransportsForOrder(TransportForOrderRequest request)
        {
            var transports = await _uow.Transports.Search(true);

            // pokud neexistuje sluzba, odflitrovat Osobni doruceni agentem
            if (!request.HasService)
                transports = transports.Where(transport => transport.Type != TransportType.PersonalDelivery).ToList();

            var response = transports.Select(x => _mapService.MapTransport(x)).ToList();
            return new ResponseList<TransportResponse>(ResponseStatus.Ok, response);
        }

        public async Task<ResponseList<TransportResponse>> Search(TransportSearchRequest request)
        {
            var transports = await _uow.Transports.Search(request?.OnlyActive);

            var response = transports.Select(x => _mapService.MapTransport(x)).ToList();
            return new ResponseList<TransportResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<TransportResponse>> Add(TransportAddRequest request)
        {
            var result = new TransportModel
            {
                Type = request.Type,
                IsActive = request.IsActive,
                Name = request.Name,
                Description = request.Description,
                TotalPrice = new Price(request.PriceWithoutVat),
                Image = request.Image
            };
            result = await _uow.Transports.InsertAsync(result);

            return new Response<TransportResponse>(ResponseStatus.Ok, _mapService.MapTransport(result));
        }

        public async Task<Response<TransportResponse>> Update(TransportUpdateRequest request)
        {
            var result = await _uow.Transports.FindAsync(new Guid(request.Id));
            if (result == null)
                return new Response<TransportResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            result.IsActive = request.IsActive;
            result.Name = request.Name;
            result.TotalPrice = new Price(request.PriceWithoutVat);
            result.Description = request.Description;
            result.Image = request.Image;
            result.Type = request.Type;

            result = await _uow.Transports.FindAndReplaceAsync(new Guid(request.Id), result);

            return new Response<TransportResponse>(ResponseStatus.Ok, _mapService.MapTransport(result));
        }

        public async Task<Response> Remove(string id)
        {
            await _uow.Transports.DeleteAsync(new Guid(id));
            return new Response(ResponseStatus.Ok);
        }
    }
}
