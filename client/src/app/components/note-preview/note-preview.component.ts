import { Component, computed, inject, input } from '@angular/core';
import { Note } from '../../types/note.types';
import { NoteService } from '../../services/notes/note.service';

@Component({
  selector: 'app-note-preview',
  standalone: true,
  imports: [],
  templateUrl: './note-preview.component.html',
  styleUrl: './note-preview.component.scss',
})
export class NotePreviewComponent {
  noteService = inject(NoteService);

  selectedNote = this.noteService.selectedNote;

  note = input.required<Note>();
  truncatedContent = computed(() => {
    const content = this.note().content;
    return content.length > 99 ? content.slice(0, 96) + '...' : content;
  });
}
