using ess_api.Core.Interfaces;
using ess_api.DAL;
using ess_api.DAL.Repositories;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ess_api.Test.RepositoriesTest
{
    [TestClass]
    public class ArticleRepositoryTest
    {
        //[TestInitialize]
        //public void TestInitialize()
        //{

        //}
        [TestMethod]
        public void Get()
        {
            using (IUnitOfWork _uw = new UnitOfWork(new EssContext()))
            {
                var res = _uw.Articles.GetAll();
                Assert.IsNotNull(res);
            }
        }

    }
}
