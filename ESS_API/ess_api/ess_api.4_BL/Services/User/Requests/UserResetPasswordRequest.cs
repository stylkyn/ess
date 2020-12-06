using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserResetPasswordRequest : Request
    {
        [Required]
        public string Email { get; set; }
    }
}
