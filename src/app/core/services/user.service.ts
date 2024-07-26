import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  loadUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?email=${email}`).pipe(
      map((users: any) => {
        if (users && users.length > 0) {
          return {
            userName: users[0].name,
            avatar: users[0].avatarUrl
          };
        } else {
          return {
            userName: 'Unknown Author',
            avatar: './assets/img/empty-user.png'
          };
        }
      })
    );
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(
      map((users: any) => {
        if (users && users.length > 0) {
          return users[0];
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
}
