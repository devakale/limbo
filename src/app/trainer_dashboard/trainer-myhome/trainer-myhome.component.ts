import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-trainer-myhome',
  templateUrl: './trainer-myhome.component.html',
  styleUrls: ['./trainer-myhome.component.css']
})
export class TrainerMyhomeComponent implements OnInit  {
  showDashboardata:any;

  constructor(private service:DashboardService,private router: Router){}

   ngOnInit(): void {
       this.service. getDashboardData().subscribe(result => {
        console.log(result);
        
        this.showDashboardata=result;
       })
   }
}
