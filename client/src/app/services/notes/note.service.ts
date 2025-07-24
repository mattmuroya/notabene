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

  notes = this._notes.asReadonly();
  loading = this._loading.asReadonly();

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
        },
      });
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
