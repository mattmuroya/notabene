import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/notes',
  },
  {
    path: 'notes',
    loadComponent: async () => {
      const m = await import('./pages/notes/notes.component');
      return m.NotesComponent;
    },
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: async () => {
      const m = await import('./pages/auth/auth.component');
      return m.AuthComponent;
    },
    data: { mode: 'login' },
  },
  {
    path: 'register',
    loadComponent: async () => {
      const m = await import('./pages/auth/auth.component');
      return m.AuthComponent;
    },
    data: { mode: 'register' },
  },
];
