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
            //string path = Path.Combine(basePath, Bin, ProjectPath, FolderPath, HtmlTemplateFolder, InvoiceTemplate);
            //Stream stream = null;
            //try
            //{
            //    stream = new MemoryStream(File.ReadAllBytes(path));
            //} catch (Exception e)
            //{
            //    var _logLibrary = new LogLibrary<AssetsFileLibrary>();
            //    _logLibrary.Error($"{nameof(AssetsFileLibrary)} - Cannot find file with path - {path}, exception: {e.Message}");
            //}
            //return StreamToString(stream);

            // only for testing, later use invoice_template.html file
            return GetInvoiceTemplate();
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

        // only for testing, later use invoice_template.html file
        public static string GetInvoiceTemplate()
        {
            return @"<!doctype html>
                <html>
                <head>
                    <meta charset=""utf-8"">
                    <title>A simple, clean, and responsive HTML invoice template</title>

                    <style>
                        .invoice-box {
                            padding: 30px;
                            font-size: 16px;
                            line-height: 24px;
                            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                            color: #555;
                        }

                            .invoice-box table {
                                width: 100%;
                                line-height: inherit;
                                text-align: left;
                            }

                                .invoice-box table td {
                                    padding: 5px;
                                    vertical-align: top;
                                }

                                .invoice-box table tr td:nth-child(2) {
                                    text-align: right;
                                }

                                .invoice-box table tr.top table td {
                                    padding-bottom: 20px;
                                    border-bottom: 3px solid #e8e8e8;
                                }

                                .invoice-box table tr.top table td.title {
                                    font-size: 15px;
                                    color: #333;
                                }

                                .invoice-box table tr.top table td.title p {
                                    white-space: pre-line;
                                }

                                .invoice-box table tr.top table td.invoice-info p {
                                    white-space: pre-line;
                                }

                                .invoice-box table tr.information > td {
                                    padding: 25px 0;
                                }

                                .invoice-box table tr.information table td p.customer {
                                    white-space: pre-line;
                                    margin: 0;
                                }

                                .invoice-box table tr.items-heading td {
                                    background: #eee;
                                    border-bottom: 1px solid #ddd;
                                    font-weight: bold;
                                }

                                    .invoice-box table tr.items-heading td:last-child {
                                        text-align: right;
                                    }

                                .invoice-box table tr.details td {
                                    padding-bottom: 20px;
                                }

                                .invoice-box table tr.item td {
                                    border-bottom: 1px solid #eee;
                                }

                                    .invoice-box table tr.item td:last-child {
                                        border-bottom: none;
                                        text-align: right;
                                    }

                                .invoice-box table tr.total td:nth-child(2) {
                                    border-top: 2px solid #eee;
                                    font-weight: bold;
                                }

                                .invoice-box table .total-price {
                                    vertical-align: middle !important;
                                }

                                .invoice-box table .total-price-value {
                                    font-size: 35px;
                                    line-height: 1.1;
                                    color: #2e2e2e;
                                    font-weight: 600;
                                }

                                .invoice-box table .invoice-label {
                                    font-size: 30px;
                                    line-height: 1.1;
                                }

                                .invoice-box table .invoice-number {
                                    font-size: 25px;
                                    font-weight: 600;
                                    padding-left: 5px;
                                }

                        /** RTL **/
                        .rtl {
                            direction: rtl;
                            font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                        }

                            .rtl table {
                                text-align: right;
                            }

                                .rtl table tr td:nth-child(2) {
                                    text-align: left;
                                }
                    </style>
                </head>

                <body>
                    <div class=""invoice-box"">
                        <table cellpadding=""0"" cellspacing=""0"">
                            <tr class=""top"">
                                <td colspan=""4"">
                                    <table>
                                        <tr>
                                            <td class=""title"">
                                                <img src=""[[logoUrl]]"" style=""width:100%; max-width:300px;"">
                                                <p>[[supplier]]</p>
                                            </td>

                                            <td class=""invoice-info"">
                                                <span class=""invoice-label"">[[invoiceLabel]]</span>
                                                <span class=""invoice-number"">[[invoiceNumber]]</span>
                                                <br />
                                                [[createdDateLabel]] [[createdDate]]<br>
                                                [[dueDateLabel]] [[dueDate]]<br />
                                                <br />
                                                <p>[[paymentInfo]]</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr class=""information"">
                                <td colspan=""4"">
                                    <table>
                                        <tr>
                                            <td>
                                                <p class=""customer"">
                                                    [[customerNameLine]]
                                                    [[customerStreetLine]]
                                                    [[customerCityLine]]
                                                </p>
                                            </td>
                                            <td className=""total-price"">
                                                <div class=""total-price-label"">[[totalPriceLabel]]</div>
                                                <div class=""total-price-value"">[[totalPrice]] Kč</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr class=""items-heading"">
                                <td>
                                    [[itemsLabel]]
                                </td>

                                <td>
                                    [[priceWithoutVatLabel]]
                                </td>

                                <td>
                                    [[vatLabel]]
                                </td>

                                <td>
                                    [[priceWithVatLabel]]
                                </td>
                            </tr>
                            [[items]]
                        </table>
                    </div>
                </body>
                </html>";
        }
    }
}
