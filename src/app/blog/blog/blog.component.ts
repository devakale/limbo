import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/common_service/dashboard.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  showblogdata:any;

  constructor(private service:DashboardService,private router: Router){}

   ngOnInit(): void {
       this.service.getblogdata().subscribe(result => {
        console.log(result);
        
        this.showblogdata=result;
       })
   }

   goToBlogDetail(id: number): void {
     this.router.navigate(['/blog', id]);  // Navigate to the blog details page with the blog ID
   }

}
