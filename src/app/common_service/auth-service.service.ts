import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<string | null>(null);

  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  user$: Observable<string | null> = this.user.asObservable();

  constructor() {
    const token = sessionStorage.getItem('Authorization');
    if (token) {
      this.setUserFromToken(token);
    }
  }

  login(token: string) {
    sessionStorage.setItem('Authorization', token);
    this.setUserFromToken(token);
  }

  logout() {
    sessionStorage.removeItem('Authorization');
    this.loggedIn.next(false);
    this.user.next(null);
  }

  private setUserFromToken(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      const username = decoded.username; // Adjust based on your token structure
      this.loggedIn.next(true);
      this.user.next(username);
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
    }
  }
}
