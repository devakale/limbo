import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courseenroll',
  templateUrl: './courseenroll.component.html',
  styleUrls: ['./courseenroll.component.css']
})
export class CourseenrollComponent implements OnInit {

  id: any;
    Showcoursedetails:any;

    constructor(private dservice:DashboardService,private router:ActivatedRoute)
    {this.id=this.router.snapshot.paramMap.get('id');}

    ngOnInit(): void {
        // console.log("Course ID:", this.id);
          this.dservice.getcouserdatabyID(this.id).subscribe((data)=>{
          console.log("API Response:", data);
          this.Showcoursedetails = data.courses[0];
        })
    }

}
