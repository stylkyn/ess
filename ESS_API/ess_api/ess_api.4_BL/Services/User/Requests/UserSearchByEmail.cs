using ess_api._4_BL.Shared.Filters;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserSearchByEmail : Request
    {
        [Required]
        public string Email { get; set; }
    }
}
