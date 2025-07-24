import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../types/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: User | null = null;

  ngOnInit() {
    // Get current user state through Observable stream
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
    });
  }
}
