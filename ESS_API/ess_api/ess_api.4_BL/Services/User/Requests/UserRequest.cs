﻿using ess_api.Core.Model;
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

        public string Password { get; set; }
    }

    public class UserCompanyRequest
    {
        public string CompanyName { get; set; }

        public string CompanyVat { get; set; }

        public string CompanyId { get; set; }

        public UserAddress Address { get; set; }

    }
}
