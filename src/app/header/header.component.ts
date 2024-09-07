import { Component, Query } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthServiceService } from '../common_service/auth-service.service';
import { Observable } from 'rxjs';
import { LoginService } from '../common_service/login.service';
import { DashboardService } from '../common_service/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  role = {
    requested_Role : ' '
  }

  query: string = '';
  results: any;
  searchitemresult:any[] = [];
  suggestions: any[] = [];
 
  


  // isTrainer: boolean = false;
  isUser: boolean = false;
  // isAdmin: boolean = false;
  
  isLoggedIn$: Observable<boolean>;
  user$: Observable<string | null>;

  constructor(private authService: AuthServiceService,private route:Router, private requst:LoginService, private dservice:DashboardService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.checkUserRole();
  
  }

  searchitem(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    const query = element.value.trim();

    if (query.length > 1) { // Trigger suggestions after at least 2 characters
      this.dservice.search(query).subscribe(
        result => {
          this.suggestions = this.formatSuggestions(result);
          console.log("search result",this.suggestions);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      this.suggestions = []; // Clear suggestions if query is too short
    }
  }
  formatSuggestions(result: any): any[] {
    // Combine and format results from different sources
    const suggestions = [];

    // Combine courses and products as suggestions
    if (result.courses) {
      suggestions.push(...result.courses.map((courses:any) => ({
        type: 'course',
        name: courses.course_name,
        id: courses._id
      })));
    }

    if (result.products) {
      suggestions.push(...result.products.map((product:any) => ({
        type: 'product',
        name: product.product_name,
        id: product._id
      })));
    }

    if (result.categories) {
      suggestions.push(...result.categories.map((category:any) => ({
        type: 'category',
        name: category.category_name,
        id: category._id
      })));
    }

    if (result.events) {
      suggestions.push(...result.events.map((events:any) => ({
        type: 'events',
        name: events.events_name,
        id: events._id
      })));
    }

    if (result.trainers) {
      suggestions.push(...result.trainers.map((trainers:any) => ({
        type: 'trainers',
        name: trainers.trainers_name,
        id: trainers._id
      })));
    }

    return suggestions;
  }

  onSelectSuggestion(suggestion: any) {
    this.query = suggestion.name; // Set the selected suggestion to the query
    this.suggestions = []; // Clear suggestions
      this.route.navigate(['/relevance'], {
      queryParams: {
        category: suggestion.name,
        
        id: suggestion.id
      }
    });
  }
  
  onsearch() {
    if (this.query) {
      this.dservice.search(this.query).subscribe(
        data => {
          this.results = data;
          console.log(this.results);   
        },
        error => {
          alert("Invalid Query");
          console.error('Error:', error);
        }
      );
    }
  }

 

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

    // this.isAdmin = role === 'ADMIN';
    // this.isTrainer = role === 'TRAINER';
    this.isUser = role === 'USER';

    console.log('isUser:', this.isUser);
}


onRoleChange() {
  console.log('Selected Role:', this.role.requested_Role);
}

//   checkUserRole() {
//     const role = this.authService.getUserRole();
//     console.log('User Role:', role);

//     this.isAdmin = role === 'ADMIN';
//     this.isTrainer = role === 'TRAINER';
//     this.isUser = role === 'USER';

//     console.log('isTrainer:', this.isTrainer, 'isUser:', this.isUser, 'isAdmin:', this.isAdmin);
// }


  

}
