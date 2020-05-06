using ess_api._4_BL.Shared.Filters;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserPromoteAgentRequest : Request
    {
        [Required]
        [Guid]
        public string UserId { get; set; }
    }
}
