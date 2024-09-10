import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-relevance',
  templateUrl: './relevance.component.html',
  styleUrls: ['./relevance.component.css']
})
export class RelevanceComponent implements OnInit {

  Showcategorydata: any[] = [];
  selectedCategories: string[] = [];
  category: string = '';
  id: string = '';

  constructor(private service: DashboardService, private filter: FilterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.service.getcategoryname().subscribe(data => {
      this.Showcategorydata = data;
      this.initializeSelectedCategory();
    });

    // Subscribe to route parameters
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || '';
      console.log("category search",this.category);
      this.id = params['id'] || '';
      console.log("id",this.id);
    });
  }


  initializeSelectedCategory() {
    if (this.category) {
      this.selectedCategories.push(this.category);
      this.filter.updateSelectedCategories(this.selectedCategories);
    }
  }

  onCategoryChange(categoryName: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.push(categoryName);
    } else {
      const index = this.selectedCategories.indexOf(categoryName);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }

    this.filter.updateSelectedCategories(this.selectedCategories);
    this.updateSelectAllCheckbox();
  }

  onSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedCategories = this.Showcategorydata.map(cat => cat.category_name); 
    } else {
      this.selectedCategories = [];
    }
    this.filter.updateSelectedCategories(this.selectedCategories);
  }

  isCategorySelected(categoryName: string): boolean {
    return this.selectedCategories.includes(categoryName);
    
  }

  areAllCategoriesSelected(): boolean {
    return this.Showcategorydata.every(cat => this.selectedCategories.includes(cat.category_name));
  }

  updateSelectAllCheckbox(): void {
    const selectAllCheckbox = document.getElementById('selectAll') as HTMLInputElement;
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = this.areAllCategoriesSelected();
      
    }
  }
}

// import { Component, OnInit } from '@angular/core';
// import { DashboardService } from '../common_service/dashboard.service';
// import { FilterService } from '../common_service/filter.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-relevance',
//   templateUrl: './relevance.component.html',
//   styleUrls: ['./relevance.component.css']
// })
// export class RelevanceComponent implements OnInit {

//   Showcategorydata: any[] = [];
//   selectedCategories: string[] = [];
//   category: string='';
//   id: string='';

//   constructor(private service: DashboardService, private filter: FilterService,private route:ActivatedRoute) {}

//   ngOnInit(): void {
//     this.service.getcategoryname().subscribe(data => {
//       this.Showcategorydata = data;
//     });
  
//   }

//   onCategoryChange(categoryName: string, event: Event) {
//     const isChecked = (event.target as HTMLInputElement).checked;

//     if (isChecked) {
//       this.selectedCategories.push(categoryName);
//     } else {
//       const index = this.selectedCategories.indexOf(categoryName);
//       if (index > -1) {
//         this.selectedCategories.splice(index, 1);
//       }
//     }

//     this.filter.updateSelectedCategories(this.selectedCategories);
//     this.updateSelectAllCheckbox();
//   }

//   onSelectAll(event: Event): void {
//     const isChecked = (event.target as HTMLInputElement).checked;

//     if (isChecked) {
//       this.selectedCategories = this.Showcategorydata.map(cat => cat.category_name);
//     } else {
//       this.selectedCategories = [];
//     }

//     this.filter.updateSelectedCategories(this.selectedCategories);
//   }

//   isCategorySelected(categoryName: string): boolean {
//     return this.selectedCategories.includes(categoryName);
//   }

//   areAllCategoriesSelected(): boolean {
//     return this.Showcategorydata.every(cat => this.selectedCategories.includes(cat.category_name));
//   }

//   updateSelectAllCheckbox(): void {
//     const selectAllCheckbox = document.getElementById('selectAll') as HTMLInputElement;
//     if (selectAllCheckbox) {
//       selectAllCheckbox.checked = this.areAllCategoriesSelected();
//     }
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { DashboardService } from '../common_service/dashboard.service';
// import { FilterService } from '../common_service/filter.service';

// @Component({
//   selector: 'app-relevance',
//   templateUrl: './relevance.component.html',
//   styleUrls: ['./relevance.component.css']
// })
// export class RelevanceComponent implements OnInit{

//   Showcategorydata:any[]=[];
//   selectedCategories: string[] = [];

//   constructor(private service:DashboardService, private filter:FilterService){}

// ngOnInit(): void {
//   this.service.getcategoryname().subscribe(data => {
//     this.Showcategorydata = data;
//   });
// }

// onCategoryChange(categoryName: string, event: Event) {
//   const isChecked = (event.target as HTMLInputElement).checked;

//   if (isChecked) {
//     this.selectedCategories.push(categoryName);
//   } else {
//     const index = this.selectedCategories.indexOf(categoryName);
//     if (index > -1) {
//       this.selectedCategories.splice(index, 1);
//     }
//   }
//   this.filter.updateSelectedCategories(this.selectedCategories);
// }

// onSelectAll(event: Event): void {
//   const isChecked = (event.target as HTMLInputElement).checked;

//   if (isChecked) {
//     this.selectedCategories = this.Showcategorydata.map(cat => cat.category_name);
//   } else {
//     this.selectedCategories = [];
//   }

//   // Ensure that all category checkboxes are updated
//   this.filter.updateSelectedCategories(this.selectedCategories);
// }

// }
