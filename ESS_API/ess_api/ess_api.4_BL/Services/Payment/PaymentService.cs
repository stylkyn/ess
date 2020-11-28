using ess_api._4_BL.Services.Payment.Requests;
using ess_api._4_BL.Services.Payment.Responses;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Services.Transport.Requests;
using ess_api.Core.Constant;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Payment
{
    public class PaymentService : MainService
    {
        public async Task<ResponseList<PaymentResponse>> GetPaymentByTransport(PaymentGetByTransportRequest request)
        {
            var transport = await _uow.Transports.FindAsync(new Guid(request.TransportId));
            if (transport == null)
                return new ResponseList<PaymentResponse>(ResponseStatus.BadRequest, null, ResponseMessagesConstans.NotFound);

            var payments = await _uow.Payments.FindManyAsync();

            switch (transport.Type)
            {
                case TransportType.DeliveryPoint:
                    var possiblePaymentTypes = new List<PaymentType>() { PaymentType.CashOnPlace, PaymentType.PaymentOrder };
                    payments = payments.Where(payment => possiblePaymentTypes.Contains(payment.Type)).ToList();
                    break;
                case TransportType.HomeDelivery:
                    var possiblePaymentTypes2 = new List<PaymentType>() { PaymentType.CashOnDelivery, PaymentType.PaymentOrder };
                    payments = payments.Where(payment => possiblePaymentTypes2.Contains(payment.Type)).ToList();
                    break;
                case TransportType.PersonalDelivery:
                    var possiblePaymentTypes3 = new List<PaymentType>() { PaymentType.CashOnPlace, PaymentType.PaymentOrder };
                    payments = payments.Where(payment => possiblePaymentTypes3.Contains(payment.Type)).ToList();
                    break;
                case TransportType.PersonalPickup:
                    var possiblePaymentTypes4 = new List<PaymentType>() { PaymentType.CashOnPlace, PaymentType.PaymentOrder };
                    payments = payments.Where(payment => possiblePaymentTypes4.Contains(payment.Type)).ToList();
                    break;
            }

            var response = payments.Select(x => _mapService.MapPayment(x)).ToList();
            return new ResponseList<PaymentResponse>(ResponseStatus.Ok, response);
        }

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
                Image = request.Image,
                Name = request.Name,
                TotalPrice = new Price(request.PriceWithoutVat),
                Description = request.Description,
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
            result.Image = request.Image;
            result.TotalPrice = new Price(request.PriceWithoutVat);
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
