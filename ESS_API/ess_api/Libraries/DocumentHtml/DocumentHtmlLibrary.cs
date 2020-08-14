using Libraries.DocumentHtml.Abstraction;
using NReco.PdfGenerator;
using System.IO;
using System.Web.Mvc;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace Libraries.DocumentHtml
{
    public class DocumentHtmlLibrary : IDocumentHtmlLibrary
    {    
        public FileResult HtmlToFile(string html, string fileName)
        {
            //PdfDocument pdf = CreatePdfDoc(html);

            //using (MemoryStream ms = new MemoryStream())
            //{
            //    pdf.Save(ms);
            //    pdfBytes = ms.ToArray();
            //    pdf.Close();
            //}

            byte[] pdfBytes = CreatePdfDoc(html);
            FileResult fileResult = new FileContentResult(pdfBytes, "application/pdf");
            fileResult.FileDownloadName = fileName;
            return fileResult;
        }

        private byte[] CreatePdfDoc(string html)
        {
            HtmlToPdfConverter htmlConverter = new HtmlToPdfConverter();
            var res = htmlConverter.GeneratePdf(html);

            //byte[] res = null;
            //using (MemoryStream ms = new MemoryStream())
            //{
            //    var pdf = PdfGenerator.GeneratePdf(html, PdfSharp.PageSize.A4);
            //    pdf.Save(ms);
            //    res = ms.ToArray();
            //}
            return res;
        }

        //private PdfDocument CreatePdfDoc(string html)
        //{
        //    HtmlToPdf converter = new HtmlToPdf();
        //    converter.Options.PdfPageSize = PdfPageSize.A4;
        //    converter.Options.WebPageWidth = 1024;
        //    converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;
        //    converter.Options.MinPageLoadTime = 2;
        //    converter.Options.MaxPageLoadTime = 120;

        //    PdfDocument doc = converter.ConvertHtmlString(html);
        //    return doc;
        //}
    }
}
