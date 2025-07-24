import { Component, input } from '@angular/core';
import { Note } from '../../types/note.types';

@Component({
  selector: 'app-note-preview',
  standalone: true,
  imports: [],
  templateUrl: './note-preview.component.html',
  styleUrl: './note-preview.component.scss',
})
export class NotePreviewComponent {
  note = input.required<Note>();
}
