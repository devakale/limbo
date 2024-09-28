import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit{
  showtrainerData:any;
  filtertrainer:any[] = [];

  page = 0;
  limit = 4;
  
  constructor(private service:DashboardService, private filter: FilterService){}

  ngOnInit(): void {

    this.service.gettrainerdata().subscribe(data =>{
      this.showtrainerData=data.trainers;
      this.filtertrainer = this.showtrainerData;
    });
    // this.service.gettrainerdata().subscribe(data =>{
    //   console.log(data);
      
    //   this.showtrainerData=data.trainers;
    //   this.filtertrainer = this.showtrainerData;
    //   // console.log(this.filtertrainer);
      
    // });
    this.filter.selectedCategories$.subscribe(selectedCategories => {
      if (selectedCategories.length > 0) {
        this.filtertrainer = this.showtrainerData.filter((trainer: any) =>
          selectedCategories.includes(trainer.f_Name.category_id)        
        );
      } else {
        this.filtertrainer = this.showtrainerData; // Show all courses if no category is selected
      }
    });
  }

}
