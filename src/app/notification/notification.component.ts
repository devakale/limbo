import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  Shownotification:any;

  constructor(private service:LoginService){}

  ngOnInit(): void {
      this.service.Notification().subscribe(result =>{
        console.log(result);
        this.Shownotification = result;
      })  
  }
}
