import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateNoteRequest, Note } from '../../types/note.types';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);

  private _notes = signal<Note[]>([]);
  private _loading = signal<boolean>(false);
  private _selectedNote = signal<Note | null>(null);

  notes = this._notes.asReadonly();
  loading = this._loading.asReadonly();
  selectedNote = this._selectedNote.asReadonly();

  loadNotes() {
    this._loading.set(true);
    this.http
      .get<Note[]>('/api/notes', {
        withCredentials: true,
      })
      .subscribe({
        next: (fetchedNotes) => {
          this._loading.set(false);
          this._notes.set(fetchedNotes);
          this._selectedNote.set(
            fetchedNotes.length > 0 ? fetchedNotes[0] : null
          );
        },
      });
  }

  selectNote(note: Note) {
    this._selectedNote.set(note);
  }

  createNote(createNoteRequest: CreateNoteRequest) {
    this.http
      .post<Note>('/api/notes', createNoteRequest, {
        withCredentials: true,
      })
      .subscribe({
        next: (createdNote) => {
          this._notes.set([createdNote, ...this._notes()]);
        },
      });
  }
}
