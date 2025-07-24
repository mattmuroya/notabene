import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  successMessage = signal('');
  errorMessage = signal('');

  submit() {
    // Get Observable from authService.login()
    this.authService
      .login({
        email: this.email(),
        password: this.password(),
      })
      // .subscribe() invokes the Observable retrieved from authService
      .subscribe({
        // Triggers when Observable emits a `next` signal (upon HTTP success status code)
        next: (user) => {
          console.log(user);
          console.log('Login successful');
          this.router.navigate(['/']);
        },
        // Triggers when Observable emits an `error` signal (upon HTTP error status code)
        error: (err) => {
          console.log(err);
          console.log('Login failed');
        },
      });
  }

  // submit() {
  //   this.authService
  //     .login({
  //       email: this.email(),
  //       password: this.password(),
  //     })
  //     .subscribe({
  //       next: (success) => {
  //         if (success) {
  //           // Triggers on success status code
  //           this.successMessage.set(
  //             'Login successful! Redirecting to home page...'
  //           );
  //           setTimeout(() => {
  //             this.router.navigate(['/']);
  //           }, 3000);
  //         } else {
  //           // Triggers on bad status code
  //           this.errorMessage.set('Invalid credentials');
  //         }
  //       },
  //       error: (err) => {
  //         console.error(err.error.errors);
  //         this.errorMessage.set('Unknown error');
  //       },
  //     });
  // }
}
