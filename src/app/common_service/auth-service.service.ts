import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  role: string;
  id: string; 
  username?: string; // Optional username field
}



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<string | null >(null);
  private tokenKey = 'Authorization';


  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();
  user$: Observable<string | null> = this.user.asObservable();
  id$:Observable<string | null> = this.userId.asObservable();

  constructor() {
    const token = sessionStorage.getItem('Authorization');
    if (token) {
      this.setUserFromToken(token);
    }
  }

  login(token: string) {
    sessionStorage.setItem('Authorization', token);
    sessionStorage.setItem(this.tokenKey, token);
    this.setUserFromToken(token);
  }

  logout() {
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.user.next(null);
    this.userId.next(null);
  }

  // private setUserFromToken(token: string) {
  //   try {
  //     const decoded: any = jwtDecode(token);
  //     const username = decoded.username; // Adjust based on your token structure
  //     this.loggedIn.next(true);
  //     this.user.next(username);
  //     this.id.next(id);
  //   } catch (error) {
  //     console.error('Invalid token:', error);
  //     this.logout();
  //   }
  // }

  private setUserFromToken(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const username = decoded.username !== undefined ? decoded.username : null; 
      const userId = decoded.id; // Extract the user ID from the token

      this.loggedIn.next(true);
      this.user.next(username);
      this.userId.next(userId); // Set the user ID
    } catch (error) {
      console.error('Invalid token:', error);
      this.logout();
    }
  }




  // Decode JWT token and return payload
  getTokenPayload(): JwtPayload | null {
    const token = sessionStorage.getItem(this.tokenKey);
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }
    return null;
  }

  

  // Get user role from token
  getUserRole(): string | null {
    const payload = this.getTokenPayload();
    return payload ? payload.role : null;
  }

   // Get user ID from token
   getUserId(): string | null {
    const payload = this.getTokenPayload();
    return payload ? payload.id : null;
  }
 
}
