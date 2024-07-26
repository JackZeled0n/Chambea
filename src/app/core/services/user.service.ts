import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
