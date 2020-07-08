using ess_api.Core.Constant;
using ess_api.Core.Model;
using Libraries.Log;
using Libraries.Log.Abstraction;
using Libraries.Mailing.Abstraction;
using Libraries.Mailing.Model;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Libraries.Mailing
{
    public class MailingLibrary : IMailingLibrary
    {
        private readonly SendGridClient _transactionsClient;
        private readonly ILogLibrary<MailingLibrary> _logLibrary;

        public MailingLibrary()
        {
            _logLibrary = new LogLibrary<MailingLibrary>();
            _transactionsClient = new SendGridClient(MailingConstants.SendGridApiKey);
        }

        public async Task<bool> SendConfirmedOrderEmail(OrderModel order)
        {
            return await SendTransactionalEmail(
                MailingConstants.ConfirmedOrder,
                order,
                MailingConstants.EmailInfo,
                order.Customer?.Personal?.Contact?.Email,
                MailingConstants.EmailNamed,
                order.Customer.IsCompany() ? order.Customer.Company.CompanyName 
                    : order.Customer.Personal.GetFullName()
            );
        }

        private async Task<bool> SendTransactionalEmail(string templateId, object data, string emailFrom, string emailTo, string nameFrom, string nameTo, FileResult attachment = null)
        {
            var emailData = new TransactionalEmailRequest
            {
                ContentData = data,
                Sender = new Sender
                {
                    CompanyName = MailingConstants.SenderCompanyName,
                    Address = MailingConstants.SenderAddress,
                    City = MailingConstants.SenderCity,
                    State = MailingConstants.SenderState,
                    Zip = MailingConstants.SenderZip
                }
            };

            var msg = MailHelper.CreateSingleTemplateEmail(
                new EmailAddress(emailFrom, nameFrom),
                new EmailAddress(emailTo, nameTo),
                templateId,
                emailData
            );

            if (attachment != null && attachment is FileContentResult)
            {
                var attachmentInBytes = ((FileContentResult)attachment).FileContents;
                msg.AddAttachment(attachment.FileDownloadName, Convert.ToBase64String(attachmentInBytes));
            }

            var response = await _transactionsClient.SendEmailAsync(msg);
            if (response.StatusCode != HttpStatusCode.Accepted)
            {
                _logLibrary.Error($"{nameof(MailingLibrary)} - Bad response from SendGrid email Status Code - {response.StatusCode}");
                return false;
            }

            return true;
        }
    }
}
