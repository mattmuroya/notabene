using Api.Dtos.Auth;
using Api.Models;

namespace Api.Extensions.Auth;

public static class RegisterDtoExtensions
{
    public static ApplicationUser ToApplicationUser(this RegisterDto registerDto)
    {
        return new ApplicationUser
        {
            UserName = registerDto.Email,
            Email = registerDto.Email
        };
    }
}