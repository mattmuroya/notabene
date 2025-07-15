using Api.Context;
using Api.Interfaces;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories;

public class NoteRepository : INoteRepository
{
    private readonly ApplicationDbContext _context;

    public NoteRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    // public async Task<IEnumerable<Note>> GetAllAsync()
    // {
    //     return await _context.Notes.OrderByDescending(n => n.ModifiedOn).ToListAsync();
    // }

    public async Task<IEnumerable<Note>> GetByUserIdAsync(string userId)
    {
        return await _context.Notes.Where(n => n.UserId == userId).ToListAsync();
    }

    public async Task<Note?> GetByIdAsync(int id, string userId)
    {
        return await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
    }

    public async Task<Note> CreateAsync(Note note)
    {
        await _context.Notes.AddAsync(note); // Stage note object for write to DB
        await _context.SaveChangesAsync(); // Write data and assign Id to note object

        return note;
    }

    public async Task<Note?> UpdateAsync(int id, Note note, string userId)
    {
        var noteToUpdate = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
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

    public async Task<Note?> DeleteAsync(int id, string userId)
    {
        var noteToDelete = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);
        if (noteToDelete == null)
        {
            return null;
        }

        _context.Notes.Remove(noteToDelete);
        await _context.SaveChangesAsync();

        return noteToDelete;
    }
}