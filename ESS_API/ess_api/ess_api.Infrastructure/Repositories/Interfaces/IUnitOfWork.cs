using System;

namespace ess_api.Core.Interfaces
{
    public interface IUnitOfWork
    {
        IProductRepository Products { get; }
        ICategoryRepository Categories { get; }
        IUserRepository Users { get; }
        ITransportRepository Transports { get; }
        IPaymentRepository Payments { get; }
        IOrderRepository Orders { get; }
        ISettingRepository Settings { get; }
    }
}
