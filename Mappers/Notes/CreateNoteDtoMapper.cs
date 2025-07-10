using NotaBene.Dtos.Notes;
using NotaBene.Models;

namespace NotaBene.Mappers.Notes;

public static class CreateNoteDtoMapper
{
    public static Note ToNote(this CreateNoteDto createNoteDto)
    {
        return new Note
        {
            Title = createNoteDto.Title,
            Content = createNoteDto.Content,
        };
    }
}