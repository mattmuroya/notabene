import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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
            'Registration successful! Redirecting to login page...'
          );
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          console.error(err.error.errors);
          this.errorMessage.set('Registration failed');
        },
      });
  }
}
