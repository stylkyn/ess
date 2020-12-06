using ess_api.Core.Model;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Libraries.Mailing.Abstraction
{
    public interface IMailingLibrary
    {
        /**
         *  User emails
         */
        Task<bool> SendRegisteredUserEmail(UserModel user);
        Task<bool> SendResetPasswordEmail(UserModel user);

        /**
         *  Orders emails
         */
        Task<bool> SendChangeServiceDay(OrderModel order);
        Task<bool> SendChangePaymentStateEmail(OrderModel order);
        Task<bool> SendChangeOrderStateEmail(OrderModel order);
        Task<bool> SendConfirmedOrderEmail(OrderModel order, FileResult invoiceAttachment);
    }
}
