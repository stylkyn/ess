using ess_api.Core.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace ess_api._4_BL.Services.Responses
{
    public class ResponseList<T> : Response where T : ResponseData
    {
        public ResponseList(ResponseStatus status, List<T> data, string message = null) : base(status, message)
        {
            Data = data;
        }

        [JsonProperty("data")]
        public List<T> Data { get; set; }
    }
    public class Response<T> : Response where T : ResponseData
    {
        [JsonProperty("data")]
        public T Data { get; set; }

        public Response(ResponseStatus status, T data, string message = null) : base(status, message)
        {
            Data = data;
        }
    }

    public class Response
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonIgnore]
        public ResponseStatus Status { get; set; }

        [JsonProperty("exceptions")]
        public List<Exception> Exception { get; set; }

        public Response(ResponseStatus status)
        {
            Status = status;
            Message = null;
            Exception = null;
        }

        public Response(ResponseStatus status, string message)
        {
            Status = status;
            Message = message;
            Exception = null;
        }

        public Response(ResponseStatus status, string message = null, Exception exception = null)
        {
            Status = status;
            Message = message;
            Exception = new List<Exception> { exception };
        }

        public Response(ResponseStatus status, string message = null, List<Exception> exceptions = null)
        {
            Status = status;
            Message = message;
            Exception = exceptions;
        }
    }

    public enum ResponseStatus
    {
        Ok,
        NotFound,
        BadRequest,
        InternalError
    }

}
