using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ess_api.Core.Model
{
    public class UserModel : BaseModel
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public UserPersonal Personal { get; set; }
        public UserCompany Company { get; set; }

        public bool HasAdminAccess { get; set; } = false;
    }
    public class UserPersonal
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public UserAddress Address { get; set; }
        public UserContact Contact { get; set; }
    }

    public class UserCompany
    {
        public string CompanyName { get; set; }
        // DIC
        public string CompanyVat { get; set; }
        // IC
        public string CompanyId { get; set; }

        public UserAddress Address { get; set; }
    }

    public class UserAddress
    {
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
    }

    public class UserContact
    {
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
