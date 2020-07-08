using ess_api.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Libraries.Mailing.Abstraction
{
    public interface IMailingLibrary
    {
        Task<bool> SendConfirmedOrderEmail(OrderModel order);
    }
}
