import { Component, OnInit } from '@angular/core';
import { TrainerService } from '../common_service/trainer.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  showprofile:any;
  id: any;

  constructor(private serive:TrainerService,private router:ActivatedRoute)
  {this.id=this.router.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.serive.getprofile(this.id).subscribe(data =>{
      // console.log("data",data.trainer);
      this.showprofile = data;

    })
    
  }
}
