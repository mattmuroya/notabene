using NotaBene.Models;

namespace NotaBene.Interfaces;

public interface INoteRepository
{
    public Task<IEnumerable<Note>> GetAllAsync();
    public Task<Note?> GetByIdAsync(int id);
    public Task<Note> CreateAsync(Note note);
    public Task<Note?> UpdateAsync(int id, Note note);
    public Task<Note?> DeleteAsync(int id);
}