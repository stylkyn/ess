using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
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
        Task<bool> SendChangeServiceDay(OrderModel order, CalculatedOrderProduct product, UserModel user);
        Task<bool> SendChangePaymentStateEmail(OrderModel order, UserModel user);
        Task<bool> SendChangeOrderStateEmail(OrderModel order, UserModel user);
        Task<bool> SendConfirmedOrderEmail(OrderModel order, UserModel user, FileResult invoiceAttachment);
    }
}
