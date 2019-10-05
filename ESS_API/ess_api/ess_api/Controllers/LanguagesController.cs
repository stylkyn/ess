using ess_api._4_BL.Services;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    public class LanguagesController : BaseApiController
    {
        private LanguageService _ls;

        public LanguagesController()
        {
            _ls = new LanguageService();
        }

        // GET: api/Languages
        [ResponseType(typeof(IEnumerable<language>))]
        public IHttpActionResult Get()
        {
            IEnumerable<language> Languages = _ls.Get();
            if (Languages == null)
            {
                return NotFound();
            }

            return Ok(Languages);
        }

        // GET: api/Languages/5
        [ResponseType(typeof(language))]
        public IHttpActionResult Get(int Id)
        {
            language Language = _ls.Get(Id);
            if (Language == null)
            {
                return NotFound();
            }

            return Ok(Language);
        }

        // PUT: api/Languages/5
        [ResponseType(typeof(int))]
        public IHttpActionResult Put(int Id, [FromBody]language Language)
        {
            try
            {
                _ls.Update(Language);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }

        }

        // POST: api/Languages
        [ResponseType(typeof(language))]
        public IHttpActionResult Post([FromBody]language Language)
        {
            try
            {
                _ls.Add(Language);
                return Ok(Language.Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }

        // DELETE: api/Languages/5
        [ResponseType(typeof(language))]
        public IHttpActionResult Delete(int Id)
        {
            try
            {
                _ls.Remove(Id);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }
    }
}
