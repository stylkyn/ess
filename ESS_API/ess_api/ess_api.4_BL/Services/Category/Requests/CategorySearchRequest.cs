using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class CategorySearchRequest
    {
        public string FullText { get; set; }

        [Required]
        public int PageSize { get; set; }

        [Required]
        public int PageNumber { get; set; }
    }
}
