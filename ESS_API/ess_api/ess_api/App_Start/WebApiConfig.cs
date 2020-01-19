using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ess_api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            // Set response to JSON
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            config.Formatters.JsonFormatter.SupportedEncodings.Add(System.Text.Encoding.UTF8);

            // Enable CORS
            var cors = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*");
            config.EnableCors(cors);
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new
                {
                    id = RouteParameter.Optional,
                    lang = "cs"
                }
            );
        }
    }
}
