import { Component } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { LoginService } from '../common_service/login.service';
import { AuthServiceService } from '../common_service/auth-service.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  id: any;
  Showproductdata: any;
  ShowRelatedPeoduct:any;
  isLoggedIn: boolean = false;
  starsArray: number[] = [1, 2, 3, 4, 5]; // 5 stars total


  count: number = 1;

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  constructor(private dservice: DashboardService, private router: ActivatedRoute,
     private loginservices: LoginService, private route: Router,private authService:AuthServiceService) 
     { this.id = this.router.snapshot.paramMap.get('id');this.checkLoginStatus(); }

     checkLoginStatus() {
      const token = sessionStorage.getItem('Authorization');
      this.isLoggedIn = !!token; // Set true if token exists
    }

  ngOnInit(): void {
    // console.log("Course ID:", this.id);
    this.dservice.productdatabyID(this.id).subscribe((data) => {
      console.log("API Response:", data);
      this.Showproductdata = data.productDetail;
      this.ShowRelatedPeoduct = data?.relatedProducts;
    })
  }

  buyproduct(quantity:number, productId:string) {
    const token = sessionStorage.getItem('Authorization'); // Assuming your token is stored in sessionStorage
    if (token) {
      const  cart = { quantity, productId };
      this.dservice.Addtocart(cart).subscribe({
        next: (Response) =>{
          Swal.fire('Ohh...!', 'Added to cart..!', 'success');
          this.route.navigate(['/cart'])
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
          sessionStorage.setItem("Authorization",response.token);
          this.authService.login(response.token); // Set login state
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

}
