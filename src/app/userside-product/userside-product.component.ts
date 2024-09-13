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
  filteredProduct: any[] = [];


  showProductDescription(product: any) {
    this.selectedProduct = product;
  }

  constructor(private service: DashboardService,private filter:FilterService) { }
  ngOnInit(): void {
    this.service.productdata().subscribe(data => {
      console.log(data);
      this.showproductdata = data.productsWithFullImageUrls;
      this.filteredProduct = this.showproductdata;
    });

    this.filter.selectedCategories$.subscribe(selectedCategories => {
      if (selectedCategories.length > 0) {
        this.filteredProduct = this.showproductdata.filter((product: any) => {
          return selectedCategories.includes(product.categoryid?.category_name);
        });
      } else {
        this.filteredProduct = this.showproductdata; // Show all products if no category is selected
      }
    });
    
  }
  

}
