using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace NotaBene.Controllers
{
    [Route("logout")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // POST: /logout
        [HttpPost]
        [Authorize]
        public async Task<IResult> Logout(SignInManager<IdentityUser> signInManager, [FromBody] object empty)
        {
            if (empty == null) return Results.Unauthorized();

            await signInManager.SignOutAsync();
            return Results.Ok();
        }
    }
}