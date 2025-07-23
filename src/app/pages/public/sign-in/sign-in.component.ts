import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  signInForm = this.formBuilder.nonNullable.group({
    username: '',
    password: '',
  });

  async onSubmit() {
    const { username, password } = this.signInForm.getRawValue();
    try {
      const result = await this.authService.signIn(username, password);
      this.authService.setTokens(result);
      this.authService.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      console.log('The sign-in error', err);
    }
  }
}
