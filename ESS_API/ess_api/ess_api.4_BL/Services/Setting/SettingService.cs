using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api._4_BL.Services.Setting.Requests;
using ess_api._4_BL.Services.Setting.Responses;
using ess_api.Core.Constant;
using System.Threading.Tasks;

namespace ess_api._4_BL.Services.Setting
{
    public class SettingService : MainService
    {
        public async Task<Response<SettingResponse>> Get(Request request)
        {
            var setting = await _uow.Settings.GetSettings();
            if (setting == null)
                return new Response<SettingResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            var response = _mapService.MapSettings(setting);
            return new Response<SettingResponse>(ResponseStatus.Ok, response);
        }

        public async Task<Response<SettingResponse>> Update(UpdateSettingRequest request)
        {
            var setting = await _uow.Settings.GetSettings();
            if (setting == null)
                return new Response<SettingResponse>(ResponseStatus.NotFound, null, ResponseMessagesConstans.NotFound);

            setting.MaxServicesInDay = request.MaxServicesInDay;

            var response = _mapService.MapSettings(setting);
            return new Response<SettingResponse>(ResponseStatus.Ok, response);
        }
    }
}
