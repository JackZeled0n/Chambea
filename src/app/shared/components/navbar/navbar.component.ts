import { Component, ViewChild } from '@angular/core';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, AuthModalComponent]
})
export class NavbarComponent {
  @ViewChild('authModal') authModal!: AuthModalComponent;

  constructor(public authService: AuthService) {}

  openLoginModal(): void {
    this.authModal.openModal();
  }

  logout(): void {
    this.authService.logout();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }
}
