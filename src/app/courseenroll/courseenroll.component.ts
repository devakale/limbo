import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../common_service/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-courseenroll',
  templateUrl: './courseenroll.component.html',
  styleUrls: ['./courseenroll.component.css']
})
export class CourseenrollComponent implements OnInit {

  id: any;
    Showcoursedetails:any;

    constructor(private dservice:DashboardService,private router:ActivatedRoute, private route:Router,private loginservices:LoginService)
    {this.id=this.router.snapshot.paramMap.get('id');}

    ngOnInit(): void {
        // console.log("Course ID:", this.id);
          this.dservice.getcouserdatabyID(this.id).subscribe((data)=>{
          console.log("API Response:", data);
          this.Showcoursedetails = data.course;
        })
    }

    CheckLoggedIN() {
      const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage
      if (token) {
        this.route.navigate(['/signup']);
      }
      else {
        const modalElement = document.getElementById('CheckLoggedIN');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
    }

  //   CourseEnroll(course_id: string) {
  //     const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage
  
  //     if (token) {
  //         const data = { course_id };
  //         this.dservice.courseenroll(data).subscribe(
  //             response => {
  //                 alert("Yaa Hooh.!!!");
  //             },
  //             error => {
  //                 console.error("Error during enrollment", error);
  //                 alert("Failed to enroll in course.");
  //             }
  //         );
  //     } else {
  //         // User is not logged in, redirect to the registration page
  //         alert("Please Logged In...!!!")
  //         this.route.navigate(['/signup']); // Adjust the route as needed
  //     }
  // }


  
  show: boolean = false; 
  rememberMe: boolean = false;

   userData= {
      f_Name:'',
      middle_Name:'',
      l_Name:'',
      email_id:' ',
      password:' ',
      mobile_number:' ',

  }


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


       // Hide And Show Password Logic
       togglePassword() {
        this.show = !this.show;
      }

}

  

