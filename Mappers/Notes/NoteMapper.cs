using NotaBene.Dtos.Notes;
using NotaBene.Models;

namespace NotaBene.Mappers.Notes;

public static class NoteMapper
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