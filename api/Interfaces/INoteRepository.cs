using Api.Models;
using Api.Dtos.Notes;

namespace Api.Interfaces;

public interface INoteRepository
{
    // public Task<IEnumerable<Note>> GetAllAsync();
    public Task<IEnumerable<Note>> GetByUserIdAsync(string userId);
    public Task<Note?> GetByIdAsync(int id, string userId);
    public Task<Note> CreateAsync(Note note);
    public Task<Note?> UpdateAsync(int id, Note note, string userId);
    public Task<Note?> DeleteAsync(int id, string userId);
}