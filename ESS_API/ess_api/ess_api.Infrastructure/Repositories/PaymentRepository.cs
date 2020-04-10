using ess_api.Core.Interfaces;
using ess_api.Core.Model;
using ess_api.DAL;
using ess_api.DAL.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ess_api.Infrastructure.Repositories
{
    public class PaymentRepository : Repository<PaymentModel>, IPaymentRepository
    {
        public PaymentRepository(DBContext _db) : base(_db) { }

        public async Task<List<PaymentModel>> Search(bool? isActive = null)
        {
            var payments = await FindManyAsync(x => isActive == null || x.IsActive == isActive);
            return payments.ToList();
        }
    }
}
