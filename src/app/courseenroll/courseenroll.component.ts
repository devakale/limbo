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
    RelatedCourses:any;

    constructor(private dservice:DashboardService,private router:ActivatedRoute, private route:Router,private loginservices:LoginService)
    {this.id=this.router.snapshot.paramMap.get('id');}

    ngOnInit(): void {
        // console.log("Course ID:", this.id);
          this.dservice.getcouserdatabyID(this.id).subscribe((data)=>{
          console.log("API Response:", data);
          this.Showcoursedetails = data?.course;
          this.RelatedCourses = data.relatedCourses;
        })
    }

    // CheckLoggedIN() {
    //   const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage
    //   if (token) {
    //     Swal.fire('Congratulation','You have Succssfully Enroll Now! ', 'success');
    //     this.route.navigate(['/cartcourse']);
    //   }
    //   else {
    //     const modalElement = document.getElementById('CheckLoggedIN');
    //       if (modalElement) {
    //         const modal = new (window as any).bootstrap.Modal(modalElement);
    //         modal.show();
    //       }
    //   }
    // }

    CourseEnroll(course_id: string) {
      const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage
  
      if (token) {
          const data = { course_id };
          this.dservice.courseenroll(data).subscribe(
              response => {
                Swal.fire('Congratulation','You have Succssfully Enroll Now! ', 'success');
              },
              error => {
                  // console.error("Error during enrollment", error);
                   Swal.fire('Error', 'You Have Already Enrolled This course.', 'error');

              }
          );}
           else {
        const modalElement = document.getElementById('CheckLoggedIN');
              if (modalElement) {
                const modal = new (window as any).bootstrap.Modal(modalElement);
                modal.show();
              }
          
      }
  }

  token = sessionStorage.getItem('Authorization');

  stars: number[] = [1, 2, 3, 4, 5];  
  rating: number = 0;  


  toggleRating(clickedStar: number): void {
    if (this.rating === clickedStar) {
      this.rating = 0; // Reset the rating if the same star is clicked
    } else {
      this.rating = clickedStar; // Set the new rating
    }
    this.review.star_count = this.rating; // Ensure star count is updated
  }

  review = {
    review: ' ',
    star_count: 0,
    t_id:' ',
  }
  postreview(){
    if(this.token){
      this.review.star_count = this.rating;
    this.dservice.postreview(this.review).subscribe({
      next : (Response) =>{
        Swal.fire('Ohh...!', 'You are Question send Successfully..!', 'success');
      },
      error : (Error) => {
        Swal.fire('Error', 'sorry..!', 'error');
      }
    })
  }
  else{
    const modalElement = document.getElementById('CheckLoggedIN');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }  }
  }


  // conver Rupees K or laks
  getFormattedPrice(price: number): string {
    if (price >= 100000) {
      return '₹' +  (price / 100000).toFixed(1) + 'L';  // For lakhs
    } else if (price >= 1000) {
      return '₹' + (price / 1000).toFixed(1) + 'K';  // For thousands
    } else {
      return '₹' + price.toString();  // For rupees
    }
  }

  
  show: boolean = false; 
  rememberMe: boolean = false;

   userData= {
      f_Name:'',
      middle_Name:'',
      l_Name:'',
      email_id:' ',
      password:'',
      mobile_number:' ',

  }


      onSubmit(form: NgForm) {
        if (form.valid) {
          this.loginservices.postsignupdata(this.userData).subscribe({
            next: (response) => {
              // console.log(alert("Success"),response);
              Swal.fire('Congratulation','Welcome to Ximbo! <br> Were thrilled to have you join our community of esteemed trainers, coaches, and educators. Ximbo is designed to empower you with the tools and resources needed to deliver exceptional training and create impactful learning experiences. <br> You Have Register successfully!', 'success');
              this.route.navigate(['/cartcourse'])
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

  

