using ess_api._4_BL.Shared.Filters;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserChangeRoleRequest : Request
    {
        [Required]
        [Guid]
        public string UserId { get; set; }

        [Required]
        public bool HasAgentAccess { get; set; }

        [Required]
        public bool HasAdminAccess { get; set; }
    }
}
