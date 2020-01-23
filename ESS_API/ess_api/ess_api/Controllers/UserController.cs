using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<IHttpActionResult> VerifyLogin([FromBody]Login login)
        {
            var response = await _userService.VerifyLogin(login);
            return new CreateResult(response);
        }
        // LOGIN - VERIFY SOCIAL LOGIN
        [Route("VerifySocialLogin")]
        public async Task<IHttpActionResult> VerifySocialLogin([FromBody]SocialLogin socialLogin)
        {
            var response = await _userService.VerifySocialLogin(socialLogin);
            return new CreateResult(response);
        }

        // GET: api/users
        public async Task<IHttpActionResult> Get()
        {
            var response = await _userService.Get();
            return new CreateResult(response);
        }

        // GET: api/users/5
        public async Task<IHttpActionResult> Get(string Id)
        {
            var response = await _userService.Get(Id);
            return new CreateResult(response);
        }

        // PUT: api/users/5
        public async Task<IHttpActionResult> Put(int Id, [FromBody]UserRequest user)
        {
            var response = await _userService.Update(user);
            return new CreateResult(response);
        }
        // POST: api/users
        public async Task<IHttpActionResult> Post([FromBody]UserRequest user)
        {
            var response = await _userService.Add(user);
            return new CreateResult(response);
        }
    }
}