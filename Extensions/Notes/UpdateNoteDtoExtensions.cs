using NotaBene.Dtos.Notes;
using NotaBene.Models;

namespace NotaBene.Extensions.Notes;

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