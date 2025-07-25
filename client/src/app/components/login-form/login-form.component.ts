import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  successMessage = signal('');
  errorMessage = signal('');

  submit() {
    this.successMessage.set('');
    this.errorMessage.set('');
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

          this.successMessage.set(
            'Login successful. Redirecting to home page...'
          );
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        // Triggers when Observable emits an `error` signal (upon HTTP error status code)
        error: (err) => {
          console.log(err);
          console.log('Login failed');

          this.errorMessage.set('Invalid username or password.');
        },
      });
  }
}
