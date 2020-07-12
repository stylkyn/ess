namespace ess_api.Core.Model
{
    public class UserModel : BaseModel
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public UserPersonal Personal { get; set; } = new UserPersonal();
        public UserCompany Company { get; set; } = new UserCompany();

        public bool HasAdminAccess { get; set; } = false;
        public bool HasAgentAccess { get; set; } = false;
    }
    public class UserPersonal
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }

        public UserAddress Address { get; set; }
        public UserContact Contact { get; set; }

        public string GetFullName() => $"{Firstname} {Lastname}";
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

        public string GetCityLine()
        {
            return $"{PostalCode} {City}";
        }

        public string GetStreetLine()
        {
            return $"{Street} {HouseNumber}";
        }
    }

    public class UserContact
    {
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
