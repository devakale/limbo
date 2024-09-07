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
  photos:any[] = [];
  id: any;


  constructor(private serive:TrainerService,private router:ActivatedRoute)
  {this.id=this.router.snapshot.paramMap.get('id');}

  ngOnInit(): void {
    this.serive.getprofile(this.id).subscribe(data =>{
      console.log("data",data);
      this.showprofile = data;  
      this.photos = data.gallarys;   
      // console.log(this.photos) 
    })
    
  }

  currentUrl: string = window.location.href;

  shareOnWhatsApp() {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(this.currentUrl)}`;
      window.open(whatsappUrl, '_blank');
  }
  
  copyLink() {
      navigator.clipboard.writeText(this.currentUrl).then(() => {
          alert('Link copied to clipboard!');
      }).catch(err => {
          console.error('Could not copy text: ', err);
      });
  }
  
  shareOnFacebook() {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
      window.open(facebookUrl, '_blank');
  }

  showshare=false;
  shareicon(){
    this.showshare = !this.showshare;
  }

  
  
}
