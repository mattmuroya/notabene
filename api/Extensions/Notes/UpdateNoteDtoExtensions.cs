using Api.Dtos.Notes;
using Api.Models;

namespace Api.Extensions.Notes;

public static class UpdateNoteDtoExtensions
{
    public static Note ToNote(this UpdateNoteDto updateNoteDto)
    {
        return new Note
        {
            Title = updateNoteDto.Title,
            Content = updateNoteDto.Content,
            ModifiedOn = DateTime.UtcNow,
        };
    }
}