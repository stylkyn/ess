using ess_api.Core.Model;
using Libraries.AssetsFile;
using Libraries.DocumentHtml.Abstraction;
using SelectPdf;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Libraries.DocumentHtml
{
    public class DocumentHtmlLibrary : IDocumentHtmlLibrary
    {    
        public FileResult HtmlToFile(string html, string fileName)
        {
            PdfDocument pdf = CreatePdfDoc(html);

            byte[] pdfBytes = null;
            using (MemoryStream ms = new MemoryStream())
            {
                pdf.Save(ms);
                pdfBytes = ms.ToArray();
                pdf.Close();
            }

            FileResult fileResult = new FileContentResult(pdfBytes, "application/pdf");
            fileResult.FileDownloadName = fileName;
            return fileResult;
        }

        private PdfDocument CreatePdfDoc(string html)
        {
            HtmlToPdf converter = new HtmlToPdf();
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.WebPageWidth = 1024;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;

            PdfDocument doc = converter.ConvertHtmlString(html);
            return doc;
        }
    }
}
