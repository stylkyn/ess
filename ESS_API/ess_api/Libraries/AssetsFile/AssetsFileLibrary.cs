using Libraries.AssetsFile.Abstraction;
using Libraries.Log;
using NLog;
using System;
using System.IO;
using System.Reflection;

namespace Libraries.AssetsFile
{
    public class AssetsFileLibrary : IAssetsFileLibrary
    {
        private const string BasePathProduction = "Libraries.AssetsFile.Assets";
        
        private const string Bin = "bin";
        private const string ProjectPath = "AssetsFile";
        private const string FolderPath = "Assets";
        
        private const string HtmlTemplateFolder = "HtmlTemplates";
        // templates
        private const string InvoiceTemplate = "invoice_template.html";

        public static string GetInvoiceTemplate(string basePath)
        {
            //return GetHTMLTemplate(InvoiceTemplate);
            return GetHTMLTemplate(basePath);
        }

        private static string GetHTMLTemplate(string basePath)
        {
            string path = Path.Combine(basePath, Bin, ProjectPath, FolderPath, HtmlTemplateFolder, InvoiceTemplate);
            Stream stream = null;
            try
            {
                stream = new MemoryStream(File.ReadAllBytes(path));
            } catch (Exception e)
            {
                var _logLibrary = new LogLibrary<AssetsFileLibrary>();
                _logLibrary.Error($"{nameof(AssetsFileLibrary)} - Cannot find file with path - {path}, exception: {e.Message}");
            }

            return StreamToString(stream);
        }

        // find file by assembly
        //private static string GetHTMLTemplate(string fileName)
        //{
        //    var assembly = typeof(AssetsFileLibrary).GetTypeInfo().Assembly;
        //    string path = $"{ProjectPath}.{FolderPath}.{HtmlTemplateFolder}.{fileName}";
        //    Stream stream = assembly.GetManifestResourceStream(path);

        //    return StreamToString(stream);
        //}

        private static string StreamToString(Stream stream)
        {
            StreamReader reader = new StreamReader(stream);
            string text = reader.ReadToEnd();

            return text;
        }
    }
}
