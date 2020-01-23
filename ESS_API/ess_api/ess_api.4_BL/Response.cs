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
        public Response(ResponseStatus status, T data, string message = null) : base(status, message)
        {
            Data = data;
        }

        [JsonProperty("data")]
        public T Data { get; set; }
    }

    public class Response
    {
        public Response(ResponseStatus status, string message = null, Exception exception = null)
        {
            Status = status;
            Message = message;
            Exception = exception;
        }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonIgnore]
        public ResponseStatus Status { get; set; }

        [JsonProperty("exception")]
        public Exception Exception { get; set; }
    }

    public enum ResponseStatus
    {
        Ok,
        NotFound,
        BadRequest,
        InternalError,
    }

}
