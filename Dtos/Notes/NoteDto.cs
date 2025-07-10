namespace NotaBene.Dtos.Notes;

public class NoteDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public DateTime ModifiedOn { get; set; } = DateTime.UtcNow;
}