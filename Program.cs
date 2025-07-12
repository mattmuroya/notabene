using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NotaBene.Context;
using NotaBene.Interfaces;
using NotaBene.Repositories;

namespace NotaBene;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddAuthorization();
        builder.Services.AddScoped<INoteRepository, NoteRepository>();
        builder.Services.AddControllers();

        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            if (builder.Environment.IsDevelopment())
                options.UseInMemoryDatabase("ApplicationDb");
            else
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

        builder.Services.AddIdentityApiEndpoints<IdentityUser>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.MapIdentityApi<IdentityUser>();

        app.Run();
    }
}