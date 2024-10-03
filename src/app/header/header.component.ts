import { Component, Query } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
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

  

  Showcategorydata:any;
  category: string = '';
  id: string = '';
  type: string = '';  
  keyword: string = '';

  role = {
    requested_Role : ' '
  }

  institute = {
    institute_name  : ' '
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

  constructor(private authService: AuthServiceService,
    private route:Router, 
    private requst:LoginService, 
    private dservice:DashboardService,
    private router:ActivatedRoute) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
    this.router.queryParams.subscribe(params => {
    this.category = params['category'];
    this.id = params['id'];
    this.type = params['type'];    // Retrieve the type (table source)
    this.keyword = params['keyword']; // Retrieve the user-entered keyword
    });
  }

  ngOnInit(): void {
    this.checkUserRole();

    this.dservice.getcategoryname().subscribe(data => {
      this.Showcategorydata = data;
    });
  }

  searchitem(event: KeyboardEvent) {
    const element = event.target as HTMLInputElement;
    const query = element.value.trim();

    if (query.length > 1) {
      this.dservice.search(query).subscribe(
        result => {
          this.suggestions = this.formatSearchResults(result);
          console.log("Search results", this.suggestions);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  onSelectSuggestion(suggestion: any) {
    const enteredKeyword = this.query;
    this.suggestions = [];

    if (suggestion.type === 'course') {
      this.route.navigate(['/relevance/seeallcategory'], {
        queryParams: {
          category: suggestion.category_name || 'defaultCategory',  // For courses
          id: suggestion.id,
          type: suggestion.type,
          keyword: enteredKeyword
        }
      });
    } else if (suggestion.type === 'category') {
      this.route.navigate(['/relevance/seeallcategory'], {
        queryParams: {
          category: suggestion.name || 'defaultCategory',
          id: suggestion.id,
          type: suggestion.type,
          keyword: enteredKeyword
        }
      });
    } else if (suggestion.type === 'product') {
      this.route.navigate(['/relevance/userproduct'], {
        queryParams: {
          category: suggestion.categoryid?.category_name || 'defaultCategory', // For products
          id: suggestion.id,
          type: suggestion.type,
          keyword: enteredKeyword
        }
      });
    } else if (suggestion.type === 'event') {
      this.route.navigate(['/relevance/userevent'], {
        queryParams: {
          category: suggestion.events_category || 'defaultCategory',
          id: suggestion.id,
          type: suggestion.type,
          keyword: enteredKeyword
        }
      });
    } else if (suggestion.type === 'trainer') {
      this.route.navigate(['/relevance/trainer'], {
        queryParams: {
          category: suggestion.name || 'defaultCategory',
          id: suggestion.id,
          type: suggestion.type,
          keyword: enteredKeyword
        }
      });
    }
  }

  formatSearchResults(result: any): any[] {
    const formattedResults = [];
    if (result.Courses) {
      formattedResults.push(...result.Courses.map((course: any) => ({
        type: 'course',
        name: course.course_name,
        category_name: course.category_name,  // Add category_name for courses
        id: course._id
      })));
    }

    if (result.products) {
      formattedResults.push(...result.products.map((product: any) => ({
        type: 'product',
        name: product.product_name,
        categoryid: product.categoryid,  // categoryid contains category_name
        id: product._id
      })));
    }

    if (result.categories) {
      formattedResults.push(...result.categories.map((category: any) => ({
        type: 'category',
        name: category.category_name,
        id: category._id
      })));
    }

    if (result.events) {
      formattedResults.push(...result.events.map((event: any) => ({
        type: 'event',
        name: event.event_name,
        events_category: event.events_category,
        id: event._id
      })));
    }

    if (result.trainers) {
      formattedResults.push(...result.trainers.map((trainer: any) => ({
        type: 'trainer',
        name: trainer.f_Name,
        id: trainer._id
      })));
    }

    return formattedResults;
  }



  // onSelectSuggestion(suggestion: any) {
  //   const enteredKeyword = this.query;
  
  //   this.suggestions = [];
  
  //   if (suggestion.type === 'course') {
  //     this.route.navigate(['/relevance/seeallcategory'], {
  //       queryParams: {
  //         category: suggestion.name,
  //         id: suggestion.id,
  //         type: suggestion.type,  
  //         keyword: enteredKeyword  
  //       }
  //     });
  //   }
  //   else if (suggestion.type === 'category') {
  //     this.route.navigate(['/relevance/seeallcategory'], {
  //       queryParams: {
  //         category: suggestion.category_name,
  //         id: suggestion.id,
  //         type: suggestion.type,  
  //         keyword: enteredKeyword  
  //       }
  //     });
  //   }
  //   else if (suggestion.type === 'product') {
  //     this.route.navigate(['/relevance/userproduct'], {
  //       queryParams: {
  //         category: suggestion.name,
  //         id: suggestion.id,
  //         type: suggestion.type,  
  //         keyword: enteredKeyword  
  //       }
  //     });
  //   } else if (suggestion.type === 'event') {
  //     this.route.navigate(['/relevance/userevent'], {
  //       queryParams: {
  //         category: suggestion.name,
  //         id: suggestion.id,
  //         type: suggestion.type,  
  //         keyword: enteredKeyword  
  //       }
  //     });
  //   } else if (suggestion.type === 'trainer') {
  //     this.route.navigate(['/relevance/trainer'], {
  //       queryParams: {
  //         category: suggestion.name,
  //         id: suggestion.id,
  //         type: suggestion.type,  
  //         keyword: enteredKeyword  
  //       }
  //     });
  //   }
  // }
  
  

  onsearch() {
    if (this.query) {
      this.dservice.search(this.query).subscribe(
        data => {
          this.results = this.formatSearchResults(data);
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

  onSubmit() {
    if (this.role.requested_Role === 'INSTITUTE') {
      this.addinstitute();
    } else {
      this.sendRequest();
    }
  }

  sendRequest(){

    this.requst.postrequest(this.role).subscribe({
      next : (response) =>{
        alert("Request Sent For Self Expert.!!!")
        window.location.reload();
      },
      error: (error)=>{
        console.log(alert("Error"),error);
      }
    })

  }

  addinstitute(){

    this.requst.postinstitute(this.institute).subscribe({
      next : (response) =>{
        alert("Request Sent For Institute.!!!")
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


}
