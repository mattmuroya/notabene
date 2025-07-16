import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  isAuthenticated = signal(false);

  register(registerRequest: RegisterRequest): Observable<unknown> {
    return this.http.post('/api/auth/register', registerRequest, {
      withCredentials: true,
    });
  }

  login(loginRequest: LoginRequest): Observable<unknown> {
    return this.http.post('/api/auth/login', loginRequest, {
      withCredentials: true,
    });
  }

  logout(): Observable<unknown> {
    const logoutRequest = {};
    return this.http.post('/api/auth/logout', logoutRequest, {
      withCredentials: true,
    });
  }
}
