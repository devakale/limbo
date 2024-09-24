import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';

@Component({
  selector: 'app-userside-product',
  templateUrl: './userside-product.component.html',
  styleUrls: ['./userside-product.component.css']
})
export class UsersideProductComponent implements OnInit {

  showproductdata: any;
  selectedProduct: any;
  selectedCategories: string[] = []; 
  filteredProduct: any[] = [];

  constructor(private service: DashboardService, private filter: FilterService) { }

  ngOnInit(): void {
    this.service.productdata().subscribe(data => {
      console.log(data);
      this.showproductdata = data.productsWithFullImageUrls;
      this.filterProducts(); // Apply filter after fetching the product data
    });
    // Subscribe to category changes
    this.filter.selectedCategories$.subscribe(categories => {
      this.selectedCategories = categories;
      this.filterProducts();
    });
    
  }

  filterProducts(): void {
    if (this.selectedCategories.length > 0) {
      this.filteredProduct = this.showproductdata.filter((product: any) => 
        this.selectedCategories.includes(product.categoryid?.category_name)
      );
    } else {
      this.filteredProduct = this.showproductdata;  // No filtering if no categories selected
    }
  }

  showProductDescription(product: any) {
    this.selectedProduct = product;
  }
}


//import { Component, OnInit } from '@angular/core';
// import { DashboardService } from '../common_service/dashboard.service';
// import { FilterService } from '../common_service/filter.service';

// @Component({
//   selector: 'app-userside-product',
//   templateUrl: './userside-product.component.html',
//   styleUrls: ['./userside-product.component.css']
// })
// export class UsersideProductComponent implements OnInit {

//   showproductdata: any;
//   selectedProduct: any;
//   selectedCategories: string[] = []; 
//   filteredProduct: any[] = [];

//   showProductDescription(product: any) {
//     this.selectedProduct = product;
//   }

//   constructor(private service: DashboardService,private filter:FilterService) { }
//   ngOnInit(): void {
//     this.service.productdata().subscribe(data => {
//       console.log(data);
//       this.showproductdata = data.productsWithFullImageUrls;
//       this.filteredProduct = this.showproductdata;
//       this.applyFilter();
//     });

//     this.filter.selectedCategories$.subscribe(selectedCategories => {
//       if (selectedCategories.length > 0) {
//         this.filteredProduct = this.showproductdata.filter((product: any) => {
//           return selectedCategories.includes(product.categoryid?.category_name);
//         });
//       } else {
//         this.filteredProduct = this.showproductdata; 
//       }
//     });
    
//   }
  

//   applyFilter(): void {
//     if (this.selectedCategories.length > 0) {
//       this.filteredProduct = this.showproductdata.filter((product: any) => 
//         this.selectedCategories.includes(product.categoryid?.category_name)
//       );
//     } else {
//       this.filteredProduct = this.showproductdata;  // No filtering if no categories selected
//     }
//   }

// }
