import { Component, effect, inject } from '@angular/core';
import { NoteService } from '../../services/notes/note.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  private noteService = inject(NoteService);

  selectedNote = this.noteService.selectedNote;
  private saveSubject = new Subject<void>();

  updatedTitle = '';
  updatedContent = '';

  constructor() {
    this.saveSubject.pipe(debounceTime(1000)).subscribe(() => {
      const note = this.selectedNote();
      if (note) {
        this.noteService.updateNote(note.id, {
          title: this.updatedTitle,
          content: this.updatedContent,
        });
      }
    });

    // Runs when signals inside it change
    // i.e. when a new note is selected, sets new updated title/content state
    effect(() => {
      const note = this.selectedNote();
      if (note) {
        this.updatedTitle = note.title;
        this.updatedContent = note.content;
      } else {
        this.updatedTitle = '';
        this.updatedContent = '';
      }
    });
  }

  onChangeTitle(event: Event) {
    this.updatedTitle = (event.target as HTMLInputElement).value;
    this.saveSubject.next();
  }

  onChangeContent(event: Event) {
    this.updatedContent = (event.target as HTMLTextAreaElement).value;
    this.saveSubject.next();
  }
}
