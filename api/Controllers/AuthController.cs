using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [Route("logout")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // POST: /logout
        [HttpPost("/api/auth/logout")]
        [Authorize]
        public async Task<IResult> Logout(SignInManager<ApplicationUser> signInManager, [FromBody] object empty)
        {
            if (empty == null) return Results.Unauthorized();

            await signInManager.SignOutAsync();
            return Results.Ok();
        }
    }
}