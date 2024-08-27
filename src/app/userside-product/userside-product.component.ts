import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';

@Component({
  selector: 'app-userside-product',
  templateUrl: './userside-product.component.html',
  styleUrls: ['./userside-product.component.css']
})
export class UsersideProductComponent implements OnInit{
      
  showproductdata:any;

  selectedProduct: any;

  showProductDescription(product: any) {
    this.selectedProduct = product;
  }
  
  constructor(private service:DashboardService){}

  ngOnInit(): void {
    this.service.productdata().subscribe(data =>{
      this.showproductdata=data.productsWithFullImageUrls;
  });
  }

}
