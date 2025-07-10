using NotaBene.Dtos.Notes;
using NotaBene.Models;

namespace NotaBene.Mappers.Notes;

public static class UpdateNoteDtoMapper
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