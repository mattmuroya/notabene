import { Component, computed, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  mode = computed(() => {
    return this.route.snapshot.data['mode'] === 'register'
      ? 'register'
      : 'login';
  });
}
