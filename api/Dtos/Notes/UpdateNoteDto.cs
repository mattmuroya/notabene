using System.ComponentModel.DataAnnotations;

namespace Api.Dtos.Notes;

public class UpdateNoteDto
{
    [Required]
    [StringLength(240)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;
}