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
            CreatedAt = note.CreatedAt,
            UpdatedAt = note.UpdatedAt,
            UserId = note.UserId,
        };
    }
}