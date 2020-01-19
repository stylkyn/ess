using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : BaseApiController
    {
        private UserService _userService;

        public UserController()
        {
            _userService = new UserService();
        }

        // LOGIN - VERIFY USER
        [Route("VerifyLogin")]
        public IHttpActionResult VerifyLogin([FromBody]Login login)
        {

            if (login == null)
            {
                return NotFound();
            }
            return Ok(_userService.VerifyLogin(login));
        }
        // LOGIN - VERIFY SOCIAL LOGIN
        [Route("VerifySocialLogin")]
        public IHttpActionResult VerifySocialLogin([FromBody]SocialLogin socialLogin)
        {

            if (socialLogin == null)
            {
                return NotFound();
            }
            return Ok(_userService.VerifySocialLogin(socialLogin));
        }

        // GET: api/users
        public IHttpActionResult Get()
        {
            List<UserResponse> users = _userService.Get();
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // GET: api/users/5
        public IHttpActionResult Get(string Id)
        {
            UserResponse user = _userService.Get(Id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/5
        public IHttpActionResult Put(int Id, [FromBody]UserRequest user)
        {
            try
            {
                _userService.Update(user);
                return Ok(Id);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }

        }

        // POST: api/users
        public IHttpActionResult Post([FromBody]UserRequest user)
        {
            try
            {
                _userService.Add(user);
                return Ok(user);
            }
            catch (Exception e)
            {
                throw new MyException(e);
            }
        }
    }
}