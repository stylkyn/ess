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
        public async Task<ResponseList<TransportResponse>> Search(TransportSearchRequest request)
        {
            var payments = await _uow.Transports.Search(request?.OnlyActive);

            var response = payments.Select(x => _mapService.MapTransport(x)).ToList();
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
                PersonalPickup = request.PersonalPickup != null ?  new PersonalPickupTransport { } : null,
                CzechPost = request.CzechPost != null ? new CzechPostTransport {
                    Places = request.CzechPost?.Places?.Select(x => new CzechPostTransportOption
                    {
                        Name = x.Name
                    }).ToList()
                }: null,
                Zasilkovna = request.Zasilkovna != null ? new ZasilkovnaTransport { } : null
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
            result.Description = request.Description;
            result.PersonalPickup = request.PersonalPickup != null ? new PersonalPickupTransport { } : null;
            result.CzechPost = request.CzechPost != null ? new CzechPostTransport
            {
                Places = request.CzechPost?.Places?.Select(x => new CzechPostTransportOption
                {
                    Name = x.Name
                }).ToList()
            } : null;
            result.Zasilkovna = request.Zasilkovna != null ? new ZasilkovnaTransport { } : null;
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
