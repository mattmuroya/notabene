import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {}
