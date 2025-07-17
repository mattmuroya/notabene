using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos.Auth;
using Api.Extensions.Auth;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = registerDto.ToApplicationUser();
            var res = await _userManager.CreateAsync(user, registerDto.Password);

            if (!res.Succeeded)
            {
                var responseBody = new { errors = res.Errors.Select(e => e.Description) };
                if (responseBody.errors.Any(e => e.Contains("already taken")))
                {
                    return Conflict(responseBody);
                }

                return BadRequest(responseBody);
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Created((string?)null, new { message = "Registration successful." });
        }

        //
        // [HttpPost("/login")]
        // public async Task<IActionResult> Login(LoginRequest loginRequest)
        // {
        //     // var user = await _userManager.FindByNameAsync(loginRequest.Email);
        //     var res = await _signInManager.PasswordSignInAsync(loginRequest.Email, loginRequest.Password, false, false);
        //     
        //     if (!res.Succeeded)
        //     {
        //         return BadRequest(new { errors });
        //     }
        // }


        // POST: /logout
        // [HttpPost("/logout")]
        // [Authorize]
        // public async Task<IResult> Logout(SignInManager<ApplicationUser> signInManager, [FromBody] object empty)
        // {
        //     if (empty == null) return Results.Unauthorized();
        //
        //     await signInManager.SignOutAsync();
        // return Results.Ok();
        // }
    }
}