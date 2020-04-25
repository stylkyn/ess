using ess_api.Core.Model;
using ess_api.DAL.Repository;
using ess_api.Infrastructure.Repositories;
using System;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserSearchRequest
    {
        public string FullText { get; set; }

        public SortType? SortType { get; set; }
        public UserSortField? SortField { get; set; }

        [Required]
        public int PageSize { get; set; }

        [Required]
        public int PageNumber { get; set; }
    }
}
