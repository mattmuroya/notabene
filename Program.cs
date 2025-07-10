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

        // Add services to container
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Register interfaces to concretes type for dependency injection
        builder.Services.AddScoped<INoteRepository, NoteRepository>();

        var app = builder.Build();

        // Configure HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}