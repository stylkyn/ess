using ess_api._4_BL.Shared.Filters;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Requests
{
    public class UserRemoveRequest : Request
    {
        [Required]
        [Guid]
        public string Id { get; set; }
    }
}
