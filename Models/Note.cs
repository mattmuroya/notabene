namespace NotaBene.Models;

public class Note
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public DateTime ModifiedOn { get; set; } = DateTime.UtcNow;

    // Foreign keys
    public string UserId { get; set; }

    // Navigation properties
    public ApplicationUser User { get; set; }
}