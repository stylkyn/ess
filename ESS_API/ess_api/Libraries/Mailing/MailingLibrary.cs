using ess_api.Core.Constant;
using ess_api.Core.Extension;
using ess_api.Core.Model;
using ess_api.Core.Model.Shared;
using Libraries.Authetification;
using Libraries.Authetification.Abstraction;
using Libraries.Log;
using Libraries.Log.Abstraction;
using Libraries.Mailing.Abstraction;
using Libraries.Mailing.Request;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Libraries.Mailing
{
    public class MailingLibrary : IMailingLibrary
    {
        private readonly SendGridClient _transactionsClient;
        private readonly IAuthentificationLibrary _authentificationLibrary;
        private readonly ILogLibrary<MailingLibrary> _logLibrary;

        public MailingLibrary()
        {
            _logLibrary = new LogLibrary<MailingLibrary>();
            _authentificationLibrary = new AuthentificationLibrary();
            _transactionsClient = new SendGridClient(MailingConstants.SendGridApiKey);
        }

        /**
         *  User emails
         */
        public async Task<bool> SendRegisteredUserEmail(UserModel user)
        {
            return await SendTransactionalEmail(
                MailingConstants.RegisteredUser,
                user.Email,
                user.GetName(),
                new
                {
                    HomepageUrl = RoutesConstants.BaseUrlClient
                }
            );
        }

        public async Task<bool> SendResetPasswordEmail(UserModel user)
        {
            var token = _authentificationLibrary.GenerateJWT(user);
            return await SendTransactionalEmail(
                MailingConstants.ResetPassword,
                user.Email,
                user.GetName(),
                new {
                    user.Email,
                    ResetPasswordPageUrl = $"{RoutesConstants.BaseUrlClient}/{RoutesConstants.ResetPagePath}?jwt={token.Jwt}&expiresDate={token.ExpiresDate.ToServerFormat()}"
                }
            );
        }

        /**
         *  Orders emails
         */

        public async Task<bool> SendChangeServiceDay(OrderModel order, List<CalculatedOrderProduct> products, UserModel user)
        {
            var token = _authentificationLibrary.GenerateJWT(user);
            return await SendTransactionalEmail(
                MailingConstants.ChangeServiceDay,
                order.Customer.GetEmail(),
                order.Customer.GetName(),
                products.Select(product => new {
                    ServisDate = product?.Service?.Date != null ? ((DateTime)product.Service.Date).ToServerFormat() : null,
                    OrderDetailUrl = $s"{RoutesConstants.BaseUrlClient}/{RoutesConstants.OrderSummaryPath}/{order.Id}?jwt={token.Jwt}&expiresDate={token.ExpiresDate.ToServerFormat()}"
                }).ToArray()
            );
        }

        public async Task<bool> SendChangePaymentStateEmail(OrderModel order, UserModel user)
        {
            var token = _authentificationLibrary.GenerateJWT(user);
            return await SendTransactionalEmail(
                MailingConstants.PaymentState,
                order.Customer.GetEmail(),
                order.Customer.GetName(),
                new
                {
                    OrderPaymentStateName = order.GetOrderPaymentStateName(),
                    OrderDetailUrl = $"{RoutesConstants.BaseUrlClient}/{RoutesConstants.OrderSummaryPath}/{order.Id}?jwt={token.Jwt}&expiresDate={token.ExpiresDate.ToServerFormat()}"
                }
            );
        }

        public async Task<bool> SendChangeOrderStateEmail(OrderModel order, UserModel user)
        {
            var token = _authentificationLibrary.GenerateJWT(user);
            return await SendTransactionalEmail(
                MailingConstants.ChangeOrderState,
                order.Customer.GetEmail(),
                order.Customer.GetName(),
                new
                {
                    OrderStateName = order.GetOrderStateName(),
                    OrderDetailUrl = $"{RoutesConstants.BaseUrlClient}/{RoutesConstants.OrderSummaryPath}/{order.Id}?jwt={token.Jwt}&expiresDate={token.ExpiresDate.ToServerFormat()}"
                }
            );
        }

        public async Task<bool> SendConfirmedOrderEmail(OrderModel order, UserModel user, FileResult invoiceAttachment)
        {
            var token = _authentificationLibrary.GenerateJWT(user);
            return await SendTransactionalEmail(
                MailingConstants.ConfirmedOrder,
                order.Customer.GetEmail(),
                order.Customer.GetName(),
                new {
                    OrderDetailUrl = $"{RoutesConstants.BaseUrlClient}/{RoutesConstants.OrderSummaryPath}/{order.Id}?jwt={token.Jwt}&expiresDate={token.ExpiresDate.ToServerFormat()}"
                },
                invoiceAttachment
            );
        }

        private async Task<bool> SendTransactionalEmail(
            string templateId, 
            string emailTo, 
            string nameTo, 
            object data = default, 
            FileResult attachment = null,
            string emailFrom = MailingConstants.EmailInfo, 
            string nameFrom = MailingConstants.EmailNamed
            )
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
