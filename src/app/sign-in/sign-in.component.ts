// import { Component, OnInit } from '@angular/core';
// import { LoginService } from '../common_service/login.service';
// import { FormsModule } from '@angular/forms';
// import { TrainerService } from '../common_service/trainer.service';
// import { Observable } from 'rxjs';
// import { HttpParams } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.css']
// })
// export class SignInComponent implements OnInit {


//   email_id: string = '';
//   password: string = '';
//   rememberMe: boolean = false;
//   message: string = '';
//   show: boolean = false; 
//   emailId: string | null = '';
//   constructor(private loginservice: LoginService, private route:Router, private trainer:TrainerService) {}

// ngOnInit(): void {
// }




//   onSubmit(data:any) {
//     this.loginservice.login(data).subscribe({
//       next: (response: any) => { 
//           alert('Login Successful');
//           sessionStorage.setItem("Authorization",response.token)
//         this.route.navigate(['/trainer',{email: this.email_id}]);
//         console.log(this.email_id);
//       },
//       error: (error: any) => { 
//         this.message = 'An error occurred';
//         // console.error('Login Failed', error);
//         alert("Invalid credentials. Please try again");
//       }
//     });
//   }
  
//   togglePassword() {
//     this.show = !this.show;
//   }

// }


// sign-in.component.ts
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';
import {  Router } from '@angular/router';
import { AuthServiceService } from '../common_service/auth-service.service';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email_id: string = '';
  password: string = '';
  message: string = '';
  show: boolean = false; 
  rememberMe: boolean = false;
   token = "";
   decoded:any;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthServiceService,
    private route:Router
  ) {}

  ngOnInit(): void {

    // console.log(this.decoded);

  }

  onSubmit(token: string) {
    
    this.loginService.login(token).subscribe({
      next: (response: any) => { 
        sessionStorage.setItem("Authorization",response.token);
            this.route.navigate(['/trainer']);
            this.authService.login(response.token); // Set login state
        Swal.fire('','We’re excited to see you again. Your login was successful, and you’re now ready to continue creating amazing learning experiences.', 'success');
        
      },
      error: () => { 
        this.message = 'An error occurred';
        //alert("Invalid credentials. Please try again");
        Swal.fire('Error', 'Please Enter Valid Details.', 'error');

      }
    });
  }

  togglePassword() {
    this.show = !this.show;
  }
}
