using Api.Dtos.Notes;
using Api.Models;

namespace Api.Extensions.Notes;

public static class CreateNoteDtoExtensions
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