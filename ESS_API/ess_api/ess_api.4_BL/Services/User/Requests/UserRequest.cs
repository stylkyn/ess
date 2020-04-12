using ess_api.Core.Model;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserRequest : UserModel
    {
    }
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

        [Required]
        public UserAddress Address { get; set; }

    }

    public class UserAddressRequest
    {
        [Required]
        public string Country { get; set; }

        [Required]
        public string PostalCode { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string HouseNumber { get; set; }
    }

    public class UserContactRequest
    {
        [Required]
        public string Phone { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
