using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserPersonalRequest
    {
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        public UserAddress Address { get; set; }

        [Required]
        public UserContact Contact { get; set; }
    }

    public class UserCompanyRequest
    {
        [Required]
        public string CompanyName { get; set; }
        // DIC

        [Required]
        public string CompanyVat { get; set; }

        // IC
        [Required]
        public string CompanyId { get; set; }

        public UserAddress Address { get; set; }

    }
}
