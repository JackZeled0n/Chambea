import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Favorite {
  id: string;
  userEmail: string;
  postId: string;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent, SearchInputComponent, FormsModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';
  userEmail: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }

    this.userEmail = this.authService.getUserEmail();
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.apiService.getFavorites(this.userEmail).pipe(
      switchMap((favorites: Favorite[]) => {
        const postObservables: Observable<any>[] = favorites.map((favorite: Favorite) =>
          this.apiService.getPost(favorite.postId).pipe(
            map(post => ({ ...post, favoriteId: favorite.id }))
          )
        );
        return forkJoin(postObservables);
      })
    ).subscribe({
      next: (posts: any[]) => {
        this.favorites = posts;
        this.filteredPosts = posts;
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
      }
    });
  }

  filterPosts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPosts = this.favorites.filter(post => 
      post.title.toLowerCase().includes(query)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterPosts();
  }

  handleFavoriteRemoved(favoriteId: string): void {
    this.favorites = this.favorites.filter(fav => fav.favoriteId !== favoriteId);
    this.filterPosts();
  }
}
