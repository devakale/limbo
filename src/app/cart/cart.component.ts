import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  showcartdata: any;
  totalprice: number = 0;

  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.service.getcartproduct().subscribe(data => {
      console.log(data);
      this.showcartdata = data.items;
      this.totalprice = data.totalPrice;
    });
  }

  increment(index: number) {
    this.showcartdata[index].quantity++;
    this.updateTotalPrice(index);
  }

  decrement(index: number) {
    if (this.showcartdata[index].quantity > 1) {
      this.showcartdata[index].quantity--;
      this.updateTotalPrice(index);
    }
  }

  // Function to update the total price for the specific product
  updateTotalPrice(index: number) {
    const product = this.showcartdata[index];
    product.productTotalPrice = product.productPrice * product.quantity;

    // Optionally, you can also update the overall cart total price here
    this.totalprice = this.showcartdata.reduce((acc: number, item: any) => acc + item.productTotalPrice, 0);
  }

  deletecartproduct(productId: string): void {
    this.service.deletecartproductbyID(productId).subscribe(
      response => {
        alert("Product Removed successfully");
        window.location.reload();
      },
      error => {
        alert("Error");
      }
    );
  }

}
