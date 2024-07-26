import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; 
  }

  toggleSignUp(): void {
    this.isSignUp = !this.isSignUp;
    this.resetForms(); 
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

  onSubmit(): void {
    if (this.isSignUp) {
      if (this.signUpForm.valid) {
        console.log('Sign Up Form Data:', this.signUpForm.value);
        this.closeModal();
      }
    } else {
      if (this.authForm.valid) {
        console.log('Sign In Form Data:', this.authForm.value);
        this.closeModal();
      }
    }
  }
}
