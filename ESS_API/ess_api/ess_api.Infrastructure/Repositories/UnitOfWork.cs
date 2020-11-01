using ess_api.Core.Interfaces;
using ess_api.Infrastructure.Repositories;
using ess_api.Repository;

namespace ess_api.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public IProductRepository Products { get; private set; }
        public ICategoryRepository Categories { get; private set; }
        public IUserRepository Users { get; private set; }
        public ITransportRepository Transports { get; private set; }
        public IPaymentRepository Payments { get; private set; }
        public IOrderRepository Orders { get; private set; }
        public ISettingRepository Settings { get; private set; }


        public UnitOfWork(DBContext db)
        {
            Products = new ProductRepository(db);
            Categories = new CategoryRepository(db);
            Users = new UserRepository(db);
            Transports = new TransportRepository(db);
            Payments = new PaymentRepository(db);
            Orders = new OrderRepository(db);
            Settings = new SettingRepository(db);
        }
    }
}
