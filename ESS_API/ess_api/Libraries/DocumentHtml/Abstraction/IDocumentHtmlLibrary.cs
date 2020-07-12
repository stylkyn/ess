using System.Web.Mvc;

namespace Libraries.DocumentHtml.Abstraction
{
    public interface IDocumentHtmlLibrary
    {
        FileResult HtmlToFile(string html, string fileName);
    }
}
