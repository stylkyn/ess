using ess_api._4_BL.Services.Responses;
using ess_api.Controllers;
using ess_api.Core.Constant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace ess_api.App_Start.Filters
{
    [AttributeUsage(AttributeTargets.Method, Inherited = true)]
    public class RequiredRequestAttribute : ActionFilterAttribute
    {
        private readonly Func<Dictionary<string, object>, bool> _validate;

        public RequiredRequestAttribute() : this(arguments => arguments.ContainsValue(null))
        { }

        public RequiredRequestAttribute(Func<Dictionary<string, object>, bool> checkCondition)
        {
            _validate = checkCondition;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (_validate(actionContext.ActionArguments))
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