using Microsoft.EntityFrameworkCore;
using NotaBene.Models;

namespace NotaBene.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Note> Note { get; set; }
}