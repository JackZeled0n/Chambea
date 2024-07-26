import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AuthModalComponent {
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  isVisible = false;
  passwordVisible = false;
  isSignUp = false;
  loginError: string | null = null;
  signUpSuccess: string | null = null;

  constructor(private authService: AuthService) {}

  openModal(): void {
    this.isVisible = true;
    this.resetForms();
  }

  closeModal(): void {
    this.isVisible = false;
  }

  resetForms(): void {
    this.authForm.reset();
    this.signUpForm.reset();
    this.loginError = null;
    this.signUpSuccess = null;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    this.resetForms();
  }

  onSubmit(): void {
    this.loginError = null;

    if (this.isSignUp) {
      if (this.signUpForm.valid) {
        this.authService.register(this.signUpForm.value).subscribe({
          next: (newUser) => {
            console.log('Registered successfully', newUser);
            this.signUpSuccess = 'Registration successful!';
            setTimeout(() => {
              this.closeModal();
            }, 2000);
          },
          error: (error) => {
            console.error('Registration error:', error);
          }
        });
      }
    } else {
      if (this.authForm.valid) {
        const email = this.authForm.value.email;
        const password = this.authForm.value.password;

        if (email && password) {
          this.authService.login(email, password).subscribe({
            next: (user) => {
              if (user) {
                console.log('Logged in successfully', user);
                this.closeModal();
              } else {
                this.loginError = 'Invalid email or password';
              }
            },
            error: (error) => {
              console.error('Login error:', error);
              this.loginError = 'An error occurred during login. Please try again.';
            }
          });
        }
      }
    }
  }

  get authEmail() {
    return this.authForm.get('email');
  }

  get authPassword() {
    return this.authForm.get('password');
  }

  get signUpEmail() {
    return this.signUpForm.get('email');
  }

  get signUpFullName() {
    return this.signUpForm.get('fullName');
  }

  get signUpPassword() {
    return this.signUpForm.get('password');
  }
}
