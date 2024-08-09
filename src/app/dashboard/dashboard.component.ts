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

  showtrainerData:any;

  toggleView() {
    this.showAll = !this.showAll;
  }

  visibleCategories() {
    return this.showAll ? this.showCategorydata : this.showCategorydata.slice(0, 4);
  }


  showAlltrainer: boolean = false;
  toggleViewtainer() {
    this.showAlltrainer = !this.showAlltrainer;
  }
  visibleTrainer(){
    return this.showAlltrainer ? this.showtrainerData : this.showtrainerData.slice(0, 6)
  }


  
   constructor(private Dservice:DashboardService, private  service:AdminService){}

   ngOnInit(): void{
      this.service.getcategorydata().subscribe( data =>{
        console.log(data);
        this.showCategorydata = data.categories;
      });

      this.Dservice.gettrainerdata().subscribe(data =>{
        this.showtrainerData=data;
      });
   }

}
