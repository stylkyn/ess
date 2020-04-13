using ess_api._4_BL.Services.Responses;
using ess_api.Controllers;
using ess_api.Core.Constant;
using System;
using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace ess_api.App_Start.Filters
{
    public class RequiredRequestAttribute : ActionFilterAttribute
    {
        public RequiredRequestAttribute() {
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.Keys.Count == 0)
            {
                var result = new CreateResult(
                    new Response(
                        ResponseStatus.NotFound,
                        ResponseMessages.RequestCannotBeNullMissingProperties));
                actionContext.Response = result.ToHttpResponseMessage();
            }
        }
    }
}