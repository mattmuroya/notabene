using System.ComponentModel.DataAnnotations;

namespace NotaBene.Dtos.Notes;

public class CreateNoteDto
{
    [Required]
    [StringLength(240)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;
}