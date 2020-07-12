using Libraries.AssetsFile.Abstraction;
using System.IO;
using System.Reflection;

namespace Libraries.AssetsFile
{
    public class AssetsFileLibrary : IAssetsFileLibrary
    {
        private const string BasePath = "Libraries.AssetsFile.Assets";
        private const string HtmlTemplateFolder = "HtmlTemplates";
        // templates
        private const string InvoiceTemplate = "invoice_template.html";

        public static string GetInvoiceTemplate()
        {
            return GetHTMLTemplate(InvoiceTemplate);
        }

        private static string GetHTMLTemplate(string fileName)
        {
            var assembly = typeof(AssetsFileLibrary).GetTypeInfo().Assembly;
            string path = $"{BasePath}.{HtmlTemplateFolder}.{fileName}";
            Stream stream = assembly.GetManifestResourceStream(path);

            return StreamToString(stream);
        }

        private static string StreamToString(Stream stream)
        {
            StreamReader reader = new StreamReader(stream);
            string text = reader.ReadToEnd();

            return text;
        }
    }
}
