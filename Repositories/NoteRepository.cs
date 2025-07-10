using Microsoft.EntityFrameworkCore;
using NotaBene.Context;
using NotaBene.Interfaces;
using NotaBene.Models;

namespace NotaBene.Repositories;

public class NoteRepository : INoteRepository
{
    private readonly ApplicationDbContext _context;

    public NoteRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Note>> GetAllAsync()
    {
        return await _context.Note.OrderByDescending(n => n.ModifiedOn).ToListAsync();
    }

    public async Task<Note?> GetByIdAsync(int id)
    {
        return await _context.Note.FindAsync(id); // Returns null if not found
    }

    public async Task<Note> CreateAsync(Note note)
    {
        await _context.Note.AddAsync(note); // Stage note object for write to DB
        await _context.SaveChangesAsync(); // Write data and assign Id to note object

        return note;
    }

    public async Task<Note?> UpdateAsync(int id, Note note)
    {
        var noteToUpdate = await _context.Note.FindAsync(id);

        if (noteToUpdate == null)
        {
            return null;
        }

        noteToUpdate.Title = note.Title;
        noteToUpdate.Content = note.Content;
        noteToUpdate.ModifiedOn = note.ModifiedOn;

        await _context.SaveChangesAsync();

        return noteToUpdate;
    }

    public async Task<Note?> DeleteAsync(int id)
    {
        var noteToDelete = await _context.Note.FindAsync(id);

        if (noteToDelete == null)
        {
            return null;
        }

        _context.Note.Remove(noteToDelete);
        await _context.SaveChangesAsync();

        return noteToDelete;
    }
}