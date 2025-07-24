import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/home/home.component').then((m) => m.HomeComponent);
    },
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./pages/login/login.component').then(
        (m) => m.LoginComponent
      );
    },
  },
  {
    path: 'register',
    loadComponent: () => {
      return import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      );
    },
  },
];
