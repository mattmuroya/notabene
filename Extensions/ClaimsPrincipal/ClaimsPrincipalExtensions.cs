using System.Security.Claims;

namespace NotaBene.Extensions.ClaimsPrincipal;

public static class ClaimsPrincipalExtensions
{
    public static string? GetUserId(this System.Security.Claims.ClaimsPrincipal user)
    {
        return user.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
    }
}