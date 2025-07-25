import { Component, inject } from '@angular/core';
import { NoteService } from '../../services/notes/note.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  noteService = inject(NoteService);

  note = this.noteService.selectedNote;
}
