using NotaBene.Dtos.Notes;
using NotaBene.Models;

namespace NotaBene.Extensions.Notes;

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