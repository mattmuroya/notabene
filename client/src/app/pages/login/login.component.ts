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
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  successMessage = signal('');
  errorMessage = signal('');

  submit() {
    this.auth
      .login({
        email: this.email(),
        password: this.password(),
      })
      .subscribe({
        next: (_res) => {
          this.successMessage.set(
            'Login successful! Redirecting to home page...'
          );
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        error: (err) => {
          console.error(err.error.errors);
          this.errorMessage.set('Invalid credentials');
        },
      });
  }
}
