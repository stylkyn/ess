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
        public async Task<IHttpActionResult> Authetificate([FromUri]AuthentificationRequest login)
        {
            var response = await _userService.Authetification(login);
            return new CreateResult(response);
        }

        public async Task<IHttpActionResult> Get()
        {
            var response = await _userService.Get();
            return new CreateResult(response);
        }

        public async Task<IHttpActionResult> Get(string Id)
        {
            var response = await _userService.Get(Id);
            return new CreateResult(response);
        }

        public async Task<IHttpActionResult> Put(int Id, [FromBody]UserRequest request)
        {
            var response = await _userService.Update(request);
            return new CreateResult(response);
        }
        public async Task<IHttpActionResult> Post([FromBody]UserRequest request)
        {
            var response = await _userService.Add(request);
            return new CreateResult(response);
        }
    }
}