import { Component, inject, input } from '@angular/core';
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

  note = input.required<Note>();

  onClick() {
    this.noteService.selectNote(this.note());
  }
}
