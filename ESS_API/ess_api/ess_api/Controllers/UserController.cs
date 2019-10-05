using ess_api._4_BL.Services;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    [RoutePrefix("api/{lang}/User")]
    public class UserController : BaseApiController
    {
        private UserService _as;

        public UserController()
        {
            _as = new UserService();
        }

        // LOGIN - VERIFY USER
        [ResponseType(typeof(IEnumerable<user>))]
        [Route("VerifyLogin")]
        public IHttpActionResult VerifyLogin([FromBody]Login login)
        {

            if (login == null)
            {
                return NotFound();
            }
            return Ok(_as.VerifyLogin(login));
        }
        // LOGIN - VERIFY SOCIAL LOGIN
        [ResponseType(typeof(IEnumerable<user>))]
        [Route("VerifySocialLogin")]
        public IHttpActionResult VerifySocialLogin([FromBody]SocialLogin socialLogin)
        {

            if (socialLogin == null)
            {
                return NotFound();
            }
            return Ok(_as.VerifySocialLogin(socialLogin));
        }

        // GET: api/users
        [ResponseType(typeof(IEnumerable<user>))]
        public IHttpActionResult Get()
        {
            IEnumerable<user> users = _as.Get();
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // GET: api/users/5
        [ResponseType(typeof(user))]
        public IHttpActionResult Get(int Id)
        {
            user user = _as.Get(Id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/5
        [ResponseType(typeof(int))]
        public IHttpActionResult Put(int Id, [FromBody]user user)
        {
            try
            {
                _as.Update(user);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }

        }

        // POST: api/users
        [ResponseType(typeof(user))]
        public IHttpActionResult Post([FromBody]user user)
        {
            try
            {
                _as.Add(user);
                return Ok(user);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }

        // DELETE: api/users/5
        [ResponseType(typeof(user))]
        public IHttpActionResult Delete(int Id)
        {
            try
            {
                _as.Remove(Id);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }
    }
}