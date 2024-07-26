import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AuthModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit  {
  @ViewChild(AuthModalComponent) authModal!: AuthModalComponent;

  ngAfterViewInit() {
    console.log(this.authModal);
  }

  openLoginModal() {
    this.authModal.openModal();
  }
}

