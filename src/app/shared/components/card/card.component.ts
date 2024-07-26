import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

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
  userName: string = ''; 
  avatar: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  isFavorite: boolean = false;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  truncateContent(content: string, limit: number): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }

  onSeePostClick() {
    this.router.navigate(['/post-details', this.id]);
  }

  loadUserByEmail(email: string) {
    this.apiService.getUserByEmail(email).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          this.userName = users[0].name;
          this.avatar = users[0].avatarUrl;
        } else {
          this.userName = 'Unknown Author';
          this.avatar = './assets/img/empty-user.png'
        }
      },
      error: (error) => {
        console.error('Error loading user name:', error);
        this.userName = 'Unknown Author';
      }
    });
  }

  ngOnInit(): void {
    this.loadUserByEmail(this.author);
  }
}
