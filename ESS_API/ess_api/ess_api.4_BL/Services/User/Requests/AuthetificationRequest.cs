using ess_api.Core.Constant;
using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class AuthentificationRequest : Request
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(UserConstants.MinUserPassword)]
        public string Password { get; set; }
    }
}
