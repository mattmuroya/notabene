using Microsoft.AspNetCore.Identity;

namespace Api.Models;

public class ApplicationUser : IdentityUser
{
    // Navigation properties
    public ICollection<Note> Notes { get; set; } = new List<Note>();
}