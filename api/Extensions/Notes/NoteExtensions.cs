using Api.Dtos.Notes;
using Api.Models;

namespace Api.Extensions.Notes;

public static class NoteExtensions
{
    public static NoteDto ToNoteDto(this Note note)
    {
        return new NoteDto
        {
            Id = note.Id,
            Title = note.Title,
            Content = note.Content,
            CreatedOn = note.CreatedOn,
            ModifiedOn = note.ModifiedOn,
            UserId = note.UserId,
        };
    }
}