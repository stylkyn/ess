using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Repository;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Results;

namespace ess_api.Controllers
{
    public class BaseApiController : ApiController
    {
        public BaseApiController() { }
    }

    public class CreateResult : IHttpActionResult
    {
        Response _response { get; set; }
        public CreateResult(Response response)
        {
            _response = response;
        }
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = new HttpResponseMessage()
            {
                Content = new ObjectContent<Response>(_response, new JsonMediaTypeFormatter()),
                StatusCode = ToStatusCode(_response.Status)
            };
            return Task.FromResult(response);
        }

        public HttpResponseMessage ToHttpResponseMessage()
        {
            return new HttpResponseMessage()
            {
                Content = new ObjectContent<Response>(_response, new JsonMediaTypeFormatter()),
                StatusCode = ToStatusCode(_response.Status)
            };
        }

        private HttpStatusCode ToStatusCode(ResponseStatus responseStatus)
        {
            switch (responseStatus)
            {
                case ResponseStatus.Ok:
                    return HttpStatusCode.OK;
                case ResponseStatus.NotFound:
                    return HttpStatusCode.NotFound;
                case ResponseStatus.BadRequest:
                    return HttpStatusCode.BadRequest;
                case ResponseStatus.InternalError:
                    return HttpStatusCode.InternalServerError;
                default: 
                    throw new NotImplementedException($"Status code for {nameof(ResponseStatus)} {responseStatus} is not implemented");
            }
        }
    }
}