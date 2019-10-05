using ess_api.Core.Interfaces;
using ess_api.DAL;
using ess_api.DAL.Repositories;

namespace ess_api._4_BL
{
    public class MainService
    {
        protected readonly IUnitOfWork _uow;

        public MainService()
        {
            _uow = new UnitOfWork(new EssContext());
        }
    }
}
