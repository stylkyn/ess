using ess_api._4_BL.Services;
using ess_api._4_BL.Services.Requests;
using ess_api._4_BL.Services.Responses;
using ess_api.App_Start.Filters;
using ess_api.Core.Model;
using ess_api.LogEx;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace ess_api.Controllers
{
    [RoutePrefix("api/Users")]
    public class UserController : BaseApiController
    {
        private readonly UserService _userService;

        public UserController()
        {
            _userService = new UserService();
        }

        public async Task<IHttpActionResult> Get(string Id)
        {
            var response = await _userService.Get(Id);
            return new CreateResult(response);
        }

        [RequiredRequest]
        [JwtAuthenticationAdmin]
        [Route("Search")]
        [HttpGet]
        public async Task<IHttpActionResult> Search([FromUri] UserSearchRequest request)
        {
            var response = await _userService.Search(request);
            return new CreateResult(response);
        }

        // LOGIN - VERIFY USER
        [Route("Authentification")]
        [HttpPost]
        public async Task<IHttpActionResult> Authentification([FromBody]AuthentificationRequest request)
        {
            var response = await _userService.Authentification(request);
            return new CreateResult(response);
        }

        // LOGIN - VERIFY ADMIN
        [Route("AuthentificationAdmin")]
        [HttpPost]
        public async Task<IHttpActionResult> AuthentificationAdmin([FromBody]AuthentificationRequest request)
        {
            var response = await _userService.AuthentificationAdmin(request);
            return new CreateResult(response);
        }

        [JwtAuthentication]
        [Route("AuthentificationJwt")]
        [HttpPost]
        public async Task<IHttpActionResult> Get(Request request)
        {
            var response = await _userService.Authentification(request);
            return new CreateResult(response);
        }

        [Route("Add")]
        [HttpPost]
        public async Task<IHttpActionResult> Add([FromBody]UserAddRequest request)
        {
            var response = await _userService.Add(request);
            return new CreateResult(response);
        }


        [Route("Update")]
        [JwtAuthentication]
        [HttpPut]
        public async Task<IHttpActionResult> Update([FromBody]UserUpdateRequest request)
        {
            var response = await _userService.Update(request);
            return new CreateResult(response);
        }

        [Route("Delete")]
        [JwtAuthenticationAdmin]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete([FromUri]UserRemoveRequest request)
        {
            var response = await _userService.Remove(request);
            return new CreateResult(response);
        }
    }
}