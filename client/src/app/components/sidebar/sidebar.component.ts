import { Component, inject } from '@angular/core';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { NoteService } from '../../services/notes/note.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NotesListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  noteService = inject(NoteService);

  onInputFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.noteService.setFilter(inputElement.value);
  }

  onClickNew() {
    this.noteService.createNote({
      title: 'New Note',
      content: '',
    });
  }
}
