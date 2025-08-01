import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { EditorComponent } from '../../components/editor/editor.component';
import { NoteService } from '../../services/notes/note.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [SidebarComponent, EditorComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  private noteService = inject(NoteService);

  ngOnInit() {
    this.noteService.loadNotes();
  }
}
