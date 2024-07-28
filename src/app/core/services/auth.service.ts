import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private userService: UserService, private apiService: ApiService) {}

  register(user: any): Observable<any> {
    return this.apiService.getUserByEmail(user.email).pipe(
      switchMap(existingUser => {
        if (existingUser) {
          return throwError(() => new Error('User already exists'));
        }
        return this.userService.registerUser(user).pipe(
          map(newUser => {
            this.userSubject.next(newUser);
            return newUser;
          })
        );
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.userService.loginUser(email, password).pipe(
      map(user => {
        this.userSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    this.userSubject.next(null);
    window.location.reload();
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  getUserEmail(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.email : '';
  }

  isAuthenticated() {
    return this.userSubject.value !== null;
  }
}
