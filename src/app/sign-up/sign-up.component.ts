import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

 
  showPassword: boolean = false;
  // password: string = '';
  show: boolean = false; 
  rememberMe: boolean = false;

  

   userData= {
    id:' ',
      user_name:' ',
      email_id:' ',
      password:' ',
      mobile_number:' ',

  }
  constructor(private loginservices:LoginService,private route:Router){ }

      ngOnInit() { }

      onSubmit(form: NgForm) {
        if (form.valid) {
          this.loginservices.postsignupdata(this.userData).subscribe({
            next: (response) => {
              // console.log(alert("Success"),response);
              Swal.fire('Congratulation','Welcome to Ximbo! <br> Were thrilled to have you join our community of esteemed trainers, coaches, and educators. Ximbo is designed to empower you with the tools and resources needed to deliver exceptional training and create impactful learning experiences. <br> You Have Register successfully!', 'success');
              this.route.navigate(['/signin'])
            },
            error: (error)=>{
              // console.log(alert("Error"),error);
              Swal.fire('Error', 'Please Enter Valid Details.', 'error');

            } 
          });
        } else {
          console.log('Form is invalid');
        }
      }

          // onSignUp(){
          //     this.loginservices.postsignupdata(this.userData).subscribe({
          //       next: (response) => {
          //         console.log(alert("Success"),response);
          //       },
          //       error: (error)=>{
          //         console.log(alert("Error"),error);
          //       } 
          //     });
          // }

       // Hide And Show Password Logic
       togglePassword() {
        this.show = !this.show;
      }

}
