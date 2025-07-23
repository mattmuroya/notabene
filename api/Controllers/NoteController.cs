using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Api.Dtos.Notes;
using Api.Interfaces;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Api.Extensions.ClaimsPrincipal;
using Api.Extensions.Notes;

namespace Api.Controllers
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
            var userId = User.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var notes = await _noteRepository.GetByUserIdAsync(userId);
            var noteDtos = notes.Select(n => n.ToNoteDto());

            return Ok(noteDtos);
        }

        // GET: api/notes/:id
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<NoteDto>> GetNote([FromRoute] int id)
        {
            var userId = User.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var note = await _noteRepository.GetByIdAsync(id, userId);
            if (note == null)
            {
                return NotFound();
            }

            return Ok(note.ToNoteDto());
        }

        // POST: api/notes
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Note>> PostNote([FromBody] CreateNoteDto createNoteDto)
        {
            var userId = User.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var note = createNoteDto.ToNote();
            note.UserId = userId;

            await _noteRepository.CreateAsync(note);
            var createdNote = note.ToNoteDto();

            // Returns 201 if successful; references GetNote(note.id) to add Location header to response
            return CreatedAtAction(nameof(GetNote), new { id = createdNote.Id }, createdNote);
        }

        // PUT: api/notes/:id
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<NoteDto>> PutNote([FromRoute] int id, [FromBody] UpdateNoteDto updateNoteDto)
        {
            var userId = User.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var note = updateNoteDto.ToNote();
            var updatedNote = await _noteRepository.UpdateAsync(id, note, userId);

            if (updatedNote == null)
            {
                return NotFound();
            }

            return Ok(updatedNote.ToNoteDto());
        }

        // DELETE: api/notes/:id
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteNote([FromRoute] int id)
        {
            var userId = User.GetUserId();
            if (userId == null)
            {
                return Unauthorized();
            }

            var note = await _noteRepository.DeleteAsync(id, userId);
            if (note == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}