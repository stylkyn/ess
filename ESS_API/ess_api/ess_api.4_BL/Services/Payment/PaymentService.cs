using ess_api._4_BL.Services.Payment.Requests;
using ess_api._4_BL.Services.Payment.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Services.Transport.Requests;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Payment
{
    public class PaymentService : MainService
    {
        public async Task<ResponseList<PaymentResponse>> Search(PaymentSearchRequest request)
        {
            var payments = await _uow.Payments.Search(request?.OnlyActive);

            var response = payments.Select(x => _mapService.MapPayment(x)).ToList();
            return new ResponseList<PaymentResponse>(ResponseStatus.Ok, response);
        }
        public async Task<Response<PaymentResponse>> Add(PaymentAddRequest request)
        {
            var result = new PaymentModel
            {
                Type = request.Type,
                IsActive = request.IsActive,
                Name = request.Name,
                Description = request.Description,
                CashOnDelivery = request.CashOnDelivery != null ? new CashOnDeliveryPayment { } : null,
                PaymentOrder = request.PaymentOrder != null ? new PaymentOrder { } : null
            };
            result = await _uow.Payments.InsertAsync(result);

            return new Response<PaymentResponse>(ResponseStatus.Ok, _mapService.MapPayment(result));
        }

        public async Task<Response<PaymentResponse>> Update(PaymentUpdateRequest request)
        {
            var result = await _uow.Payments.FindAsync(new Guid(request.Id));
            if (result == null)
                return new Response<PaymentResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            result.IsActive = request.IsActive;
            result.Name = request.Name;
            result.Description = request.Description;
            result.CashOnDelivery = request.CashOnDelivery != null ? new CashOnDeliveryPayment { } : null;
            result.PaymentOrder = request.PaymentOrder != null ? new PaymentOrder { } : null;
            result = await _uow.Payments.FindAndReplaceAsync(new Guid(request.Id), result);

            return new Response<PaymentResponse>(ResponseStatus.Ok, _mapService.MapPayment(result));
        }

        public async Task<Response> Remove(string id)
        {
            await _uow.Payments.DeleteAsync(new Guid(id));
            return new Response(ResponseStatus.Ok);
        }

    }
}
