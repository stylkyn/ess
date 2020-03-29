using ess_api._4_BL.Shared;
using ess_api.Core.Interfaces;
using ess_api.DAL;
using ess_api.DAL.Repositories;

namespace ess_api._4_BL
{
    public class MainService
    {
        protected readonly IUnitOfWork _uow;
        protected readonly SharedMapService _mapService;

        public MainService()
        {
            _uow = new UnitOfWork(new DBContext());
            _mapService = new SharedMapService();
        }
    }
}
