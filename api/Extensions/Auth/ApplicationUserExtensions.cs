using Api.Dtos.Auth;
using Api.Models;

namespace Api.Extensions.Auth;

public static class ApplicationUserExtensions
{
    public static ApplicationUserDto ToApplicationUserDto(this ApplicationUser applicationUser)
    {
        return new ApplicationUserDto
        {
            Id = applicationUser.Id,
            Email = applicationUser.Email,
        };
    }
}