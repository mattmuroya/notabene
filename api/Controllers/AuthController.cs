using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos.Auth;
using Api.Extensions.Auth;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var res = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);

            if (!res.Succeeded)
            {
                return Unauthorized(new { errors = (string[]) ["Invalid username or password."] });
            }

            return Ok(new { message = "Login Successful." });
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout([FromBody] object empty)
        {
            if (empty == null)
            {
                return Unauthorized();
            }

            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}