import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  getFavorites(userEmail: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites?userEmail=${userEmail}`);
  }

  addFavorite(favorite: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, favorite);
  }

  removeFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${id}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, post);
  }

  editPost(id: number, post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, post);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?email=${email}`);
  }
}
