import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  successMessage = signal('');
  errorMessage = signal('');

  submit() {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.auth
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
