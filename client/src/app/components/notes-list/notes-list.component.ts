import { Component, inject } from '@angular/core';
import { NotePreviewComponent } from '../note-preview/note-preview.component';
import { NoteService } from '../../services/notes/note.service';
import { Note } from '../../types/note.types';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NotePreviewComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent {
  private noteService = inject(NoteService);
  notes = this.noteService.notes;

  onClickLi(note: Note) {
    this.noteService.selectNote(note);
  }
}
