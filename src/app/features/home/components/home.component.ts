import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { AuthModalComponent } from '../../../shared/components/auth-modal/auth-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent, SearchInputComponent, FormsModule, AuthModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';
  isAuthenticated: boolean = false;

  @ViewChild('authModal') authModal!: AuthModalComponent;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.apiService.getPosts().subscribe((data: any[]) => {
      this.posts = data;
      this.filteredPosts = data;
    });

    this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  filterPosts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPosts = this.posts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.author.toLowerCase().includes(query)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterPosts();
  }

  openLoginModal(): void {
    this.authModal.openModal();
  }

  onLoginSuccess(): void {
    this.isAuthenticated = true;
  }
}
