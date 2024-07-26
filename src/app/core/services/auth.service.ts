import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private userService: UserService) {}

  register(user: any) {
    return this.userService.registerUser(user).pipe(
      map((newUser) => {
        this.userSubject.next(newUser);
        return newUser;
      })
    );
  }

  login(email: string, password: string) {
    return this.userService.loginUser(email, password).pipe(
      map((user) => {
        if (user) {
          this.userSubject.next(user);
        }
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
