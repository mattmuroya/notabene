import { Component } from '@angular/core';
import { NotesComponent } from '../../components/notes/notes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NotesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
