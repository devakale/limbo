import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent implements OnInit{

  showeventdata: any[]=[];

  constructor(private Dservice:DashboardService){}

  ngOnInit(): void {
    this.Dservice.Eventdata().subscribe(Response =>{
      console.log(Response);
      
      this.showeventdata = Response;
 })
  }

}
