import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../common_service/trainer.service';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../common_service/dashboard.service';
import Swal from 'sweetalert2';
import { Token } from '@angular/compiler';
import { LoginService } from '../common_service/login.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  showprofile:any;
  showreviewdata:any[] = [];
  starsArray = Array(5).fill(0);
  id: any;
  p: number = 1;
  currentCourse: number = 1;
  currentPageUpcomingBatches: number = 1;




  constructor(private serive:TrainerService,private router:ActivatedRoute,
    private dashboard:DashboardService,private loginservices:LoginService,private route:Router)
  {this.id=this.router.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.serive.getprofile(this.id).subscribe(data =>{
      console.log("data",data);
      this.showprofile = data;  
      this.showreviewdata = data.reviews; // Bind reviews data to showreviewdata
    });
    
    this.enquiry.trainerid = this.id;
    this.question.trainerid = this.id;
    this.review.t_id=this.id;
    this.Appoinment.t_id=this.id;
  }


//  redirect WhatsApp check Login Or Not
  handleWhatsAppClick() {
    if (this.token) {
      window.open(`https://wa.me/${this.showprofile.trainer.whatsapp_no}`, '_blank');
    } else {
      // Swal.fire({icon: 'warning',title: 'Please Login', text: 'You need to be logged in to contact via WhatsApp.',confirmButtonText: 'OK'});
      const modalElement = document.getElementById('CheckLoggedIN');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }  
    }
  }

  
  currentUrl: string = window.location.href;

  shareOnWhatsApp() {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(this.currentUrl)}`;
      window.open(whatsappUrl, '_blank');
  }
  
  
  copyLink() {
      navigator.clipboard.writeText(this.currentUrl).then(() => {
          alert('Link copied to clipboard!');
      }).catch(err => {
          console.error('Could not copy text: ', err);
      });
  }
  
  shareOnFacebook() {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
      window.open(facebookUrl, '_blank');
  }

  showshare=false;
  shareicon(){
    this.showshare = !this.showshare;
  }

  showsharereview=false;
  shareiconreview(){
    this.showsharereview = !this.showsharereview;
  }



 
  
//  Here get token For user Logged in or not for post Enquiry, question and reviews 
  token = sessionStorage.getItem('Authorization');

  enquiry = {
    description:' ',
    trainerid:' ',
  }
  
  postEnquiry(){
    if(this.token){
    this.dashboard.postEnquiry(this.enquiry).subscribe({
      next: (Response) =>{
        Swal.fire('Ohh...!', 'You are Enquiry send Successfully..!', 'success');
      },
      error : (error)=>{
        Swal.fire('Error', 'sorry..!', 'error');
      }
    })
  }
  else {
    const modalElement = document.getElementById('CheckLoggedIN');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }  }
  }
  

  question = {
    question:' ',
    trainerid:' ',
  }
  postquestion(){
    if(this.token){
    this.dashboard.postquestions(this.question).subscribe({
      next : (response) => {
        Swal.fire('Ohh...!', 'You are Question send Successfully..!', 'success');
      },
      error : (Error) =>{
        Swal.fire('Error', 'sorry..!', 'error');
      }
    });
  }
  else{
    const modalElement = document.getElementById('CheckLoggedIN');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }  }
}

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
    this.dashboard.postreview(this.review).subscribe({
      next : (Response) =>{
        Swal.fire('Ohh...!', 'You are Review Add Successfully..!', 'success');
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

  Appoinment = {
    date: ' ',
    time:' ',
    t_id:' ',
  }

  BookAppoinment(){
    if(this.token){
    this.dashboard.BookApnmt(this.Appoinment).subscribe({
      next : (Response) =>{
        Swal.fire('Ohh...!', 'You are Appoinment send Successfully..!', 'success');
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
      return '₹' + (price / 100000).toFixed(1) + 'L';  // For lakhs
    } else if (price >= 1000) {
      return '₹' + (price / 1000).toFixed(1) + 'K';  // For thousands
    } else {
      return '₹' + price.toString();  // For rupees
    }
  }


  show: boolean = false;
  rememberMe: boolean = false;

  userData = {
    f_Name: '',
    middle_Name: '',
    l_Name: '',
    email_id: ' ',
    password: '',
    mobile_number: ' ',

  }




  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginservices.postsignupdata(this.userData).subscribe({
        next: (response) => {
          // console.log(alert("Success"),response);
          Swal.fire('Congratulation', 'Welcome to Ximbo! <br> Were thrilled to have you join our community of esteemed trainers, coaches, and educators. Ximbo is designed to empower you with the tools and resources needed to deliver exceptional training and create impactful learning experiences. <br> You Have Register successfully!', 'success');
          this.route.navigate(['/cart'])
        },
        error: (error) => {
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

  
  // scroll pages in click on nav

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault(); // Prevent the default link click behavior
  
    const section = document.getElementById(sectionId);
  
    if (section) {
      const headerOffset = 70; // Adjust this value according to your header height
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY; // Get the section's position
      const offsetPosition = sectionPosition - headerOffset; // Adjust for the header
  
      // Smooth scroll to the section with an offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  
}
