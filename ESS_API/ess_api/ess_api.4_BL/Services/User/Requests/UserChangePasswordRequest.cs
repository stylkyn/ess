using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserChangePasswordRequest : Request
    {
        [Required]
        public string Password { get; set; }
    }
}
