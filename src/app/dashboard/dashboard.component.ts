import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showAll: boolean = false;
  showCategorydata:any[]=[];
  Showcouserdata:any[]=[];
  showproductdata:any[]=[];
  showeventdata:any[]=[];

  showtrainerData:any[]=[];
  selectedProduct: any;

  page = 1;
  limit = 4;

  showProductDescription(product: any) {
    this.selectedProduct = product;
  }


  visibleCategories() {
    return this.showAll ? this.showCategorydata : this.showCategorydata.slice(0, 4);
  }

  visibleCourses() {
    return this.showAll ? this.Showcouserdata : this.Showcouserdata.slice(0, 4);
  }

  visibleProduct() {
    return this.showAll ? this.showproductdata : this.showproductdata.slice(0, 4);
  }

  visibleEvent() {
    return this.showAll ? this.  showeventdata : this.  showeventdata.slice(0, 4);
  }

  showAlltrainer: boolean = false;
  toggleViewtainer() {
    this.showtrainerData || [];
    this.showAlltrainer = !this.showAlltrainer;
  }
  visibleTrainer(){
    return this.showAlltrainer ? this.showtrainerData : this.showtrainerData.slice(0, 6)
  }


  
   constructor(private Dservice:DashboardService){}

   ngOnInit(): void{
      this.Dservice.gethomedatauser(this.page, this.limit).subscribe( data =>{
        this.showCategorydata = data.categoriesWithFullImageUrl;
      });

      this.Dservice.gethomedatauser(this.page, this.limit).subscribe(result => {
        this.Showcouserdata = result.coursesWithFullImageUrl;
      });

      this.Dservice.gethomedatauser(this.page, this.limit).subscribe(data =>{
        this.showtrainerData=data.trainersWithFullImageUrl;
      });

      this.Dservice.productdata().subscribe(data =>{
          this.showproductdata=data.productsWithFullImageUrls;
      });

      this.Dservice.Eventdata().subscribe(Response =>{
           this.showeventdata = Response;
      })
   }

}
