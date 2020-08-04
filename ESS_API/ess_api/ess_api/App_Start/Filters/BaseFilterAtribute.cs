using ess_api._4_BL.Services.Responses;
using ess_api.Controllers;
using ess_api.Core.Constant;
using System;
using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace ess_api.App_Start.Filters
{
    public class BaseAttribute : ActionFilterAttribute
    {
        public BaseAttribute() {
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                var result = new CreateResult(
                    new Response(
                        ResponseStatus.BadRequest,
                        ResponseMessagesConstans.BadRequest,
                        actionContext.ModelState
                            .SelectMany(x => 
                                x.Value.Errors.Select(e => new Exception(e.ErrorMessage, e.Exception)))
                            .ToList()));
                actionContext.Response = result.ToHttpResponseMessage();
            }
        }
    }
}