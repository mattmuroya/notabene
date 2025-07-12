using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotaBene.Dtos.Notes;
using NotaBene.Extensions.Notes;
using NotaBene.Interfaces;
using NotaBene.Models;

namespace NotaBene.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;

        public NoteController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        // GET: api/notes
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes()
        {
            var notes = await _noteRepository.GetAllAsync();
            var noteDtos = notes.Select(n => n.ToNoteDto());

            return Ok(noteDtos);
        }

        // GET: api/notes/:id
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<NoteDto>> GetNote(int id)
        {
            var note = await _noteRepository.GetByIdAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return Ok(note.ToNoteDto());
        }

        // POST: api/notes
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Note>> PostNote(CreateNoteDto createNoteDto)
        {
            var note = createNoteDto.ToNote();
            await _noteRepository.CreateAsync(note);

            // Returns 201 if successful; references GetNote(note.id) to add Location header to response
            return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
        }

        // PUT: api/notes/:id
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<NoteDto>> PutNote(int id, UpdateNoteDto updateNoteDto)
        {
            var note = updateNoteDto.ToNote();
            var updatedNote = await _noteRepository.UpdateAsync(id, note);

            if (updatedNote == null)
            {
                return NotFound();
            }

            return Ok(updatedNote.ToNoteDto());
        }

        // DELETE: api/notes/:id
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _noteRepository.DeleteAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}