using ess_api.Core.Interface;
using ess_api.Core.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ess_api.Core.Interfaces
{
    public interface IPaymentRepository : IRepository<PaymentModel>
    {
        Task<List<PaymentModel>> Search(bool? isActive = null);
    }
}
