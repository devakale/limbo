import { Component } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { LoginService } from '../common_service/login.service';


@Component({
  selector: 'app-user-event-details',
  templateUrl: './user-event-details.component.html',
  styleUrls: ['./user-event-details.component.css']
})
export class UserEventDetailsComponent {

  id: any;
  ShowEvent:any;
  relatedEvent:any;
  p: number = 1;
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 3; 
  ShowEventReview:any;
  starsArray = Array(5).fill(0);


  constructor(private dservice:DashboardService,
    private router:ActivatedRoute,private route:Router,
  private loginservices:LoginService)
  {this.id=this.router.snapshot.paramMap.get('id');}

  ngOnInit(): void {
      console.log("Event ID:", this.id);
        this.dservice.EventdatabyID(this.id).subscribe((data)=>{
        console.log("API Response:", data);
        this.ShowEvent = data.event;
        this.relatedEvent = data.relatedEvent;
      })

      this.loadreview(this.currentPage,this.itemsPerPage);

      this.review.eventid=this.id;

  }

  loadreview(page: number, limit: number): void{
    this.dservice.GetEventReview(this.id,page, limit).subscribe((Response) =>{
      console.log("Review",Response);
    this.ShowEventReview = Response.data.reviews;
    this.totalItems = Response.pagination.totalReviews;
    })
  }
  

  BookEvent(event_id:string) {
    const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage

    if (token) {  
      
      const data = { event_id };
        this.dservice.bookevent(data).subscribe(
            response => {
           Swal.fire('Congratulation','You have Succssfully Booked Event! ', 'success');
            },
            error => {
                // console.error("Error during enrollment", error);
                 Swal.fire('Error', 'You Have Already Enrolled This Event.', 'error');

            } );
        
        }
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
  eventid:' ',
}
postreviewEvent(){
  if(this.token){
    this.review.star_count = this.rating;
  this.dservice.postreviewEvent(this.review).subscribe({
    next : (Response) =>{
      Swal.fire('Ohh...!', 'You are Review Add Successfully..!', 'success');
      this.resetForm();
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

resetForm() {
  this.review = {
    star_count: 0,
    review: '',
    eventid: this.review.eventid 
  };
  this.rating = 0;  
}

  // Handle page change for pagination
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadreview(this.currentPage, this.itemsPerPage); 
    this.p = page;
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
