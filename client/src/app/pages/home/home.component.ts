import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NotesComponent } from '../../components/notes/notes.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NotesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
