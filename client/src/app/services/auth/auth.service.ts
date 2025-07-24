import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, User } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // Source of truth; contains user state and notifies subscribers when changed
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // Read-only Observable that can be subscribed to ("stream")
  public currentUser$ = this.currentUserSubject.asObservable();

  // Synchronous access to current state (no subscription necessary)
  // get currentUser(): User | null {
  // return this.currentUserSubject.value;
  // }

  isAuthenticated(): Observable<boolean> {
    // Early return without making request if user state already in memory
    if (this.currentUserSubject.value) {
      return of(true);
    }

    // Else check server to establish whether auth cookie is valid
    return this.http.get<User>('/api/auth/me').pipe(
      tap((user) => {
        // Side effect on successful response
        this.currentUserSubject.next(user);
      }),
      map(() => {
        // Convert response data to boolean
        // map() automatically wraps return value in Observable
        return true;
      }),
      catchError(() => {
        // Clear user state
        this.currentUserSubject.next(null);
        // catchError does NOT automatically wrap return value in Observable
        return of(false);
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<User> {
    return (
      this.http
        // Returns an Observable that wraps POST request
        // By default, emits the response body data when subscribed
        // Can also be configured to emit the actual response object itself
        .post<User>('/api/auth/register', registerRequest)
        // Pipe is configured with the Observable instantiation
        // Executes when and only when the observable is subscribed to
        .pipe(
          tap(() => {
            // Side effects triggered by successful response status code
            // Does not execute on error status code
            // Session activated on server; but clear user state to force login on client
            this.currentUserSubject.next(null);
          }),
          catchError((err) => {
            // Handle any errors/bad response status codes
            // 4xx/5xx response codes throw automatically even without this block
            this.currentUserSubject.next(null); // Clear user state
            return throwError(() => err);
          })
        )
    );
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return (
      this.http
        // Returns an Observable that wraps POST request
        // By default, emits the response body data when subscribed
        // Can also be configured to emit the actual response object itself
        .post<User>('/api/auth/login', loginRequest)
        // Pipe is configured with the Observable instantiation
        // Executes when and only when the observable is subscribed to
        .pipe(
          tap((user) => {
            // Side effects triggered by successful response status code
            // Does not execute on error status code
            this.currentUserSubject.next(user); // Set user state
          }),
          catchError((err) => {
            // Handle any errors/bad response status codes
            // 4xx/5xx response codes throw automatically even without this block
            this.currentUserSubject.next(null); // Clear user state
            return throwError(() => err);
          })
        )
    );
  }

  logout(): Observable<unknown> {
    return this.http.post('/api/auth/logout', {}).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
      }),
      catchError((err) => {
        this.currentUserSubject.next(null);
        return throwError(() => err);
      })
    );
  }
}
