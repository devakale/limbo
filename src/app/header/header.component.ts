import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from '../common_service/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  isLoggedIn$: Observable<boolean>;
  user$: Observable<string | null>;

  constructor(private authService: AuthServiceService,private route:Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
      this.route.navigate(['/'])
  }

  

}
