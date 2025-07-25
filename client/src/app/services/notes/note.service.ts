import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CreateNoteRequest,
  Note,
  UpdateNoteRequest,
} from '../../types/note.types';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);

  private _notes = signal<Note[]>([]);
  private _filter = signal<string>('');
  private _selectedNote = signal<Note | null>(null);

  notes = computed(() => {
    const filterString = this._filter().toLowerCase();

    return this._notes().filter(
      (n) =>
        n.title.toLowerCase().includes(filterString) ||
        n.content.toLowerCase().includes(filterString)
    );
  });
  selectedNote = this._selectedNote.asReadonly();

  loadNotes() {
    this.http
      .get<Note[]>('/api/notes', {
        withCredentials: true,
      })
      .subscribe({
        next: (fetchedNotes) => {
          this._notes.set(fetchedNotes);
          this._selectedNote.set(
            fetchedNotes.length > 0 ? fetchedNotes[0] : null
          );
        },
      });
  }

  setFilter(filter: string) {
    this._filter.set(filter);
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
          this.selectNote(createdNote);
        },
      });
  }

  updateNote(id: string, updateNoteRequest: UpdateNoteRequest) {
    this.http
      .put<Note>(`/api/notes/${id}`, updateNoteRequest, {
        withCredentials: true,
      })
      .subscribe({
        next: (_success) => {
          this.loadNotes();
        },
      });
  }
}
