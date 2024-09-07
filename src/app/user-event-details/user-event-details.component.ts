import { Component } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-event-details',
  templateUrl: './user-event-details.component.html',
  styleUrls: ['./user-event-details.component.css']
})
export class UserEventDetailsComponent {

  id: any;
  ShowEvent:any;
  relatedEvent:any;

  constructor(private dservice:DashboardService,private router:ActivatedRoute)
  {this.id=this.router.snapshot.paramMap.get('id');}

  ngOnInit(): void {
      console.log("Event ID:", this.id);
        this.dservice.EventdatabyID(this.id).subscribe((data)=>{
        console.log("API Response:", data);
        this.ShowEvent = data.event;
        this.relatedEvent = data.relatedEvent;
      })
  }

}
