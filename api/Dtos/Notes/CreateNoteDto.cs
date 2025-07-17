using System.ComponentModel.DataAnnotations;

namespace Api.Dtos.Notes;

public class CreateNoteDto
{
    [Required(AllowEmptyStrings = true)]
    [StringLength(240)]
    public string Title { get; set; } = string.Empty;

    [Required(AllowEmptyStrings = true)]
    public string Content { get; set; } = string.Empty;
}