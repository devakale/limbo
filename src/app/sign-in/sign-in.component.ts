import { Component } from '@angular/core';
import { LoginService } from '../common_service/login.service';
import { FormsModule } from '@angular/forms';
import { TrainerService } from '../common_service/trainer.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {


  email_id: string = '';
  password: string = '';
  rememberMe: boolean = false;
  message: string = '';
  show: boolean = false; 

  constructor(private loginservice: LoginService, private route:Router) {}


  onSubmit() {
    this.loginservice.getLoginData(this.email_id, this.password).subscribe({
      next: (response: any) => { 
          alert('Login Successful');
        this.route.navigate(['/trainer']);
      },
      error: (error: any) => { 
        this.message = 'An error occurred';
        // console.error('Login Failed', error);
        alert("Invalid credentials. Please try again");
      }
    });
  }
  

  togglePassword() {
    this.show = !this.show;
  }


 
}
