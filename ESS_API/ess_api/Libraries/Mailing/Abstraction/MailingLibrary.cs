using ess_api.Core.Model;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Libraries.Mailing.Abstraction
{
    public interface IMailingLibrary
    {
        Task<bool> SendConfirmedOrderEmail(OrderModel order, FileResult invoiceAttachment);
    }
}
