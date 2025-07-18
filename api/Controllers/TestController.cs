using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Api.Controllers;

[Route("api/test")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly string? _environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    [HttpPost("reset-connections")]
    public IActionResult ResetConnections()
    {
        if (string.IsNullOrEmpty(_environment) || _environment is not ("Development" or "Test"))
        {
            return NotFound();
        }

        NpgsqlConnection.ClearAllPools();
        return Ok(new { message = "Database connection pools cleared successfully." });
    }
}