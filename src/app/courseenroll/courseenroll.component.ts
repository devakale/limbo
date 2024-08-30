import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courseenroll',
  templateUrl: './courseenroll.component.html',
  styleUrls: ['./courseenroll.component.css']
})
export class CourseenrollComponent implements OnInit {

  id: any;
    Showcoursedetails:any;

    constructor(private dservice:DashboardService,private router:ActivatedRoute, private route:Router)
    {this.id=this.router.snapshot.paramMap.get('id');}

    ngOnInit(): void {
        // console.log("Course ID:", this.id);
          this.dservice.getcouserdatabyID(this.id).subscribe((data)=>{
          console.log("API Response:", data);
          this.Showcoursedetails = data.course;
        })
    }

    CourseEnroll(course_id: string) {
      const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage
  
      if (token) {
          const data = { course_id };
          this.dservice.courseenroll(data).subscribe(
              response => {
                  alert("Yaa Hooh.!!!");
              },
              error => {
                  console.error("Error during enrollment", error);
                  alert("Failed to enroll in course.");
              }
          );
      } else {
          // User is not logged in, redirect to the registration page
          alert("Please Logged In...!!!")
          this.route.navigate(['/signup']); // Adjust the route as needed
      }
  }
  

  //   CourseEnroll(course_id:string) {
  //     const data = { course_id };
  //     console.log("view data",data)
  //     this.dservice.courseenroll(data).subscribe(response => {
  //         alert("Yaa Hooh.!!!")
  //     }
     
  //   );
  // }

}
