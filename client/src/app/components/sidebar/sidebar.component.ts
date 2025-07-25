import { Component, inject } from '@angular/core';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { NoteService } from '../../services/notes/note.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NotesListComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  authService = inject(AuthService);
  noteService = inject(NoteService);
  router = inject(Router);

  onInputFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.noteService.setFilter(inputElement.value);
  }

  onClickLogout() {
    this.authService.logout().subscribe((success) => {
      this.router.navigate(['/login']);
    });
  }

  onClickNew() {
    this.noteService.createNote({
      title: 'New Note',
      content: '',
    });
  }
}
