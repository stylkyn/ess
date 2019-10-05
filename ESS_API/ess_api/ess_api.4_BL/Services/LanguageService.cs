using ess_api.Core.Model;
using System.Collections.Generic;

namespace ess_api._4_BL.Services
{
    public class LanguageService : MainService
    {
        /*
        * GET
        * **/
        public IEnumerable<language> Get()
        {
            return _uow.Languages.GetAll();
        }

        public language Get(int Id)
        {
            return _uow.Languages.Find(Id);
        }

        /*
         *  SET
         * **/
        public void Add(language language)
        {
            _uow.Languages.Add(language);
            _uow.Complete();
        }

        public void Update(language language)
        {
            _uow.Languages.Update(language);
            _uow.Complete();
        }

        public void Remove(int Id)
        {
            language language = Get(Id);
            _uow.Languages.Remove(language);
            _uow.Complete();
        }

        public void RemoveRange(IEnumerable<language> languages)
        {
            _uow.Languages.RemoveRange(languages);
            _uow.Complete();
        }
    }
}
