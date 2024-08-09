import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common_service/login.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  showdata:any;

  constructor(private service:LoginService){}

  ngOnInit(): void {
      this.service.getpostsdata().subscribe(data =>{
        console.log(data);
        setTimeout(() => {
          this.showdata=data;
        }, 1000); 
       
      });
  }

}
