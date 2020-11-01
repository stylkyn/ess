using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Shared.Filters;
using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ess_api._4_BL.Services.Order.Requests
{
    public class SetOrderAgentRequest : Request
    {
        public string UserId { get; set; }
        public string ProductId { get; set; }
        public string OrderId { get; set; }
    }
}
