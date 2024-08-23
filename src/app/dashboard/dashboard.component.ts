import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { AdminService } from '../common_service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showAll: boolean = false;
  showCategorydata:any;
  Showcouserdata:any;
  showproductdata:any;
  showeventdata:any;

  showtrainerData:any;

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


  
   constructor(private Dservice:DashboardService, private  service:AdminService,){}

   ngOnInit(): void{
      this.service.getcategorydatadashboard().subscribe( data =>{
        console.log(data);
        this.showCategorydata = data.categoriesWithFullImageUrl;
      });

      this.Dservice.getcouserdata().subscribe(result => {
        this.Showcouserdata = result.coursesWithFullImageUrl;
      });

      this.Dservice.gettrainerdata().subscribe(data =>{
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
