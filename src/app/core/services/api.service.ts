import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  getPost(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  getFavorites(userEmail: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites?userEmail=${userEmail}`);
  }

  addFavorite(favorite: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, favorite);
  }

  removeFavorite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${id}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, post);
  }

  editPost(id: string, post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, post);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      map(users => users.length > 0 ? users[0] : null)
    );
  }
}
