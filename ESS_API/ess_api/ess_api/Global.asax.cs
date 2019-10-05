using System.Web.Http;

namespace ess_api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //RegisterWebApiFilters(GlobalConfiguration.Configuration.Filters);
        }

        //public static void RegisterWebApiFilters(System.Web.Http.Filters.HttpFilterCollection filters)
        //{
        //    filters.Add(new LocalizationAttribute("nl-NL"));
        //}

        //public class LocalizationAttribute : FilterAttribute
        //{
        //    private string _DefaultLanguage = "nl-NL";

        //    public LocalizationAttribute(string defaultLanguage)
        //    {
        //        _DefaultLanguage = defaultLanguage;
        //    }

        //    public void OnActionExecuting(HttpActionExecutedContext filterContext)
        //    {
        //        var baseUrl = Request.RequestUri;
        //        //string lang = (string)filterContext.RouteData.Values["lang"] ?? _DefaultLanguage;
        //        //SetLanguage(lang);
        //    }
        //}

        //public static void SetLanguage(string language)
        //{
        //    string lang = "";
        //    //switch (language)
        //    //{
        //    //    case LanguageEnum.NL:
        //    //        lang = "nl-NL";
        //    //        break;
        //    //    case LanguageEnum.EN:
        //    //        lang = "en-GB";
        //    //        break;
        //    //    case LanguageEnum.DE:
        //    //        lang = "de-DE";
        //    //        break;
        //    //}
        //    try
        //    {
        //        CultureInfo info = new CultureInfo(lang);
        //        info.DateTimeFormat.DateSeparator = "/";
        //        info.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
        //        Thread.CurrentThread.CurrentUICulture = info;
        //        Thread.CurrentThread.CurrentCulture = info;
        //    }
        //    catch (Exception)
        //    {

        //    }
        //}
    }
}
