import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { formatDate } from '../../core/services/utils/formatDate';

@Component({
  selector: 'app-create-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.css']
})
export class CreateEditPostComponent implements OnInit {
  postForm: FormGroup;
  isEditMode: boolean = false;
  postId: number | null = null;
  userEmail: string = '';
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.userEmail = this.authService.getUserEmail();

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required],
      authorEmail: [{ value: this.userEmail, disabled: true }, Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.postId = +id;
        this.loadPost(this.postId);
      }
    });
  }

  loadPost(id: number): void {
    this.apiService.getPost(id?.toString()).subscribe({
      next: (post) => {
        this.postForm.patchValue(post);
      },
      error: (error) => {
        console.error('Error loading post:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    const postValue = { ...this.postForm.value, authorEmail: this.userEmail, date: formatDate(new Date()) };

    if (this.isEditMode && this.postId) {
      this.apiService.editPost(this.postId?.toString(), postValue).subscribe({
        next: () => {
          this.successMessage = 'Post updated successfully!';
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating post:', error);
        }
      });
    } else {
      this.apiService.createPost(postValue).subscribe({
        next: () => {
          this.successMessage = 'Post created successfully!';
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.postForm.reset({
      title: '',
      summary: '',
      content: '',
      authorEmail: { value: this.userEmail, disabled: true },
      imageUrl: ''
    });
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }
}
