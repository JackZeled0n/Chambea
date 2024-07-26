import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { UserService } from '../../../core/services/user.service';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService) { }

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
    this.userService.loadUserByEmail(email).subscribe({
      next: (user) => {
        this.userName = user.userName;
        this.avatar = user.avatar;
      },
      error: (error) => {
        console.error('Error loading user name:', error);
        this.userName = 'Unknown Author';
        this.avatar = './assets/img/empty-user.png';
      }
    });
  }
}