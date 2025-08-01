import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  mode = computed(() => {
    return this.route.snapshot.data['mode'] === 'register'
      ? 'register'
      : 'login';
  });

  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  successMessage = signal('');
  errorMessage = signal('');

  capitalize(str: string) {
    return str.length === 0 ? '' : str.charAt(0).toUpperCase() + str.slice(1);
  }

  submitLogin() {
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

  submitRegister() {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.authService
      .register({
        email: this.email(),
        password: this.password(),
      })
      .subscribe({
        next: (_res) => {
          this.successMessage.set(
            'Registration successful. Redirecting to login page...'
          );
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (err) => {
          console.error(err.error.errors);
          this.errorMessage.set('Registration failed. Please try again.');
        },
      });
  }
}
