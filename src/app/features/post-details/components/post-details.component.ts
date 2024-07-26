import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  postId: string | null = null;
  post: Post | undefined;
  userName: string = '';
  avatar: string = '';
  postForm: FormGroup;
  isAuthor: boolean = false;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.postForm = this.fb.group({
      title: [{ value: '', disabled: true }, Validators.required],
      summary: [{ value: '', disabled: true }, Validators.required],
      content: [{ value: '', disabled: true }, Validators.required],
      imageUrl: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
      if (this.postId) {
        this.loadPostDetails(this.postId);
      }
    });
  }

  loadPostDetails(id: string): void {
    this.apiService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.isAuthor = this.authService.getUserEmail() === this.post?.authorEmail;
        if (this.post) {
          this.postForm.patchValue(this.post);
        }
        this.toggleFormControls(this.isAuthor);
        this.loadUserByEmail(this.post?.authorEmail);
      },
      error: (error) => {
        console.error('Error loading post details:', error);
      }
    });
  }

  loadUserByEmail(email: any): void {
    this.userService.loadUserByEmail(email).subscribe({
      next: (user) => {
        this.userName = user.userName;
        this.avatar = user.avatar ? user.avatar : './assets/img/empty-user.png';
      },
      error: (error) => {
        console.error('Error loading user name:', error);
        this.userName = 'Unknown Author';
        this.avatar = './assets/img/empty-user.png';
      }
    });
  }

  toggleFormControls(enable: boolean): void {
    if (enable) {
      this.postForm.get('title')?.enable();
      this.postForm.get('summary')?.enable();
      this.postForm.get('content')?.enable();
      this.postForm.get('imageUrl')?.enable();
    } else {
      this.postForm.get('title')?.disable();
      this.postForm.get('summary')?.disable();
      this.postForm.get('content')?.disable();
      this.postForm.get('imageUrl')?.disable();
    }
  }

  onUpdate(): void {
    if (this.postForm.invalid) {
      return;
    }

    const updatedPost = { ...this.postForm.value, authorEmail: this.post?.authorEmail, date: this.post?.date };

    if (this.postId) {
      this.apiService.editPost(this.postId, updatedPost).subscribe({
        next: () => {
          alert('Post updated successfully!');
          this.router.navigate(['/post-details', this.postId]);
        },
        error: (error) => {
          console.error('Error updating post:', error);
        }
      });
    }
  }
}
