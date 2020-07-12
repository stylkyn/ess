using ess_api.Core.Model;
using System.Web.Mvc;

namespace Libraries.DocumentHtml.Abstraction
{
    public interface IDocumentInvoiceRepository
    {
        FileResult GenerateInvoice(OrderModel order);
    }
}
