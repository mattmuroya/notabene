using Api.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DbResetter;

class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine("\n===== Begin database reset =====");

        var config = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.Test.json", optional: false, reloadOnChange: true)
            .Build();

        var connectionString = config.GetConnectionString("DefaultConnection");
        Console.WriteLine($"Connection string: {connectionString}");

        var services = new ServiceCollection();

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        var provider = services.BuildServiceProvider();

        using var scope = provider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        Console.WriteLine("Dropping database...");
        await db.Database.EnsureDeletedAsync();

        Console.WriteLine("Recreating database...");
        await db.Database.EnsureCreatedAsync();

        Console.WriteLine("Applying migrations...");
        await db.Database.MigrateAsync();

        Console.WriteLine("Database reset complete.");
    }
}