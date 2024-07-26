import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { Router } from '@angular/router';

interface Favorite {
  id: string;
  userEmail: string;
  postId: string;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  userEmail: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // Redirige al componente home si no está autenticado
      return;
    }

    this.userEmail = this.authService.getUserEmail(); // Obtén el email del usuario autenticado
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
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
      }
    });
  }

  handleFavoriteRemoved(favoriteId: string): void {
    this.favorites = this.favorites.filter(fav => fav.favoriteId !== favoriteId);
  }
}
