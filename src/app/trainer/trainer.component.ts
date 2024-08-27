import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit{
  showtrainerData:any;
  
  constructor(private service:DashboardService){}

  ngOnInit(): void {
    this.service.gettrainerdata().subscribe(data =>{
      this.showtrainerData=data.trainersWithFullImageUrl;
    });
  }

}
