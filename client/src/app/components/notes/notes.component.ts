import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../../services/notes/note.service';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { EditorComponent } from '../editor/editor.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NotesListComponent, EditorComponent, SidebarComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  private noteService = inject(NoteService);

  ngOnInit() {
    this.noteService.loadNotes();
  }
}
