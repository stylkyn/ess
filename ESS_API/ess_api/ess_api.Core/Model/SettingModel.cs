namespace ess_api.Core.Model
{
    public class SettingModel : BaseModel
    {
        public int MaxServicesInDay { get; set; } = 8;
        public int MaxAvailabilityDays { get; set; } = 60;
    }
}
