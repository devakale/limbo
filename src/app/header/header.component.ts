import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from '../common_service/auth-service.service';
import { Observable } from 'rxjs';
import { LoginService } from '../common_service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  role = {
    requested_Role : ' '
  }

  isTrainer: boolean = true;
  isUser: boolean = true;
  isAdmin: boolean = true;
  
  isLoggedIn$: Observable<boolean>;
  user$: Observable<string | null>;

  constructor(private authService: AuthServiceService,private route:Router, private requst:LoginService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
      this.route.navigate(['/'])
  }

  onSubmit(){

    this.requst.postrequest(this.role).subscribe({
      next : (response) =>{
        alert("Request Sent.!!!")
        window.location.reload();
      },
      error: (error)=>{
        console.log(alert("Error"),error);
      }
    })

  }



  checkUserRole() {
    const role = this.authService.getUserRole();
    console.log('User Role:', role);

    this.isAdmin = role === 'ADMIN';
    this.isTrainer = role === 'TRAINER';
    this.isUser = role === 'USER';

    console.log('isTrainer:', this.isTrainer, 'isUser:', this.isUser, 'isAdmin:', this.isAdmin);
}


  

}
