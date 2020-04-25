using ess_api._4_BL.Shared.Filters;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserUpdateRequest : Request
    {
        [Guid]
        public string Id { get; set; }

        public UserPersonalRequest Personal { get; set; }
        public UserCompanyRequest Company { get; set; }
    }
}
