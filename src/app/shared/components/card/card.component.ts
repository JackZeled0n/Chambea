import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Input() summary: string = '';
  @Input() imageUrl: string = '';
  @Input() author: string = ''; 
  @Input() date: string = '';
  @Input() id: string = '';
  @Input() favoriteId: string | null = null;

  @Output() favoriteRemoved: EventEmitter<string> = new EventEmitter<string>();
  @Output() showLoginModal: EventEmitter<void> = new EventEmitter<void>();

  userName: string = ''; 
  avatar: string = '';
  isAuthenticated: boolean = false;
  isFavorite: boolean = false;

  constructor(
    private router: Router, 
    private apiService: ApiService, 
    private userService: UserService, 
    private authService: AuthService
  ) {}

  toggleFavorite(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.showLoginModal.emit();
      return;
    }

    const userEmail = this.authService.getUserEmail();
    if (this.isFavorite) {
      if (this.favoriteId) {
        this.apiService.removeFavorite(this.favoriteId).subscribe({
          next: () => {
            this.isFavorite = false;
            this.favoriteRemoved.emit(this.favoriteId?.toString());
          },
          error: (error) => {
            console.error('Error removing favorite:', error);
          }
        });
      }
    } else {
      const favorite = {
        userEmail: userEmail,
        postId: this.id
      };
      this.apiService.addFavorite(favorite).subscribe({
        next: (response) => {
          this.isFavorite = true;
          this.favoriteId = response.id;
        },
        error: (error) => {
          console.error('Error adding favorite:', error);
        }
      });
    }
  }

  truncateContent(content: string, limit: number): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }

  onSeePostClick() {
    this.router.navigate(['/post-details', this.id]);
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userService.loadUserByEmail(this.author).subscribe({
      next: (user) => {
        this.userName = user.userName;
        this.avatar = user.avatar ? user.avatar: './assets/img/empty-user.png';
      },
      error: (error) => {
        console.error('Error loading user name:', error);
        this.userName = 'Unknown Author';
        this.avatar = './assets/img/empty-user.png';
      }
    });

    if (this.isAuthenticated) {
      const userEmail = this.authService.getUserEmail();
      this.apiService.getFavorites(userEmail).subscribe({
        next: (favorites) => {
          const favorite = favorites.find((fav: any) => fav.postId === this.id);
          if (favorite) {
            this.isFavorite = true;
            this.favoriteId = favorite.id;
          }
        },
        error: (error) => {
          console.error('Error loading favorites:', error);
        }
      });
    }

    this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
}
