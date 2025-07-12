using NotaBene.Dtos.Notes;
using NotaBene.Models;

namespace NotaBene.Extensions.Notes;

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
        };
    }
}