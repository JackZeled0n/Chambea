import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  authorEmail: string;
  date: string;
}

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  postId: string | null = null;
  post: Post | undefined; 
  userName: string = ''; 
  avatar: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
      if (this.postId) {
        this.loadPostDetails(Number(this.postId));
      }
    });
  }

  loadPostDetails(id: number) {
    this.apiService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loadUserByEmail(this.post?.authorEmail);
      },
      error: (error) => {
        console.error('Error loading post details:', error);
      }
    });
  }

  loadUserByEmail(email: any) {
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
}