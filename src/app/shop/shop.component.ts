import { Component } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  id: any;
    Showproductdata:any;

    constructor(private dservice:DashboardService,private router:ActivatedRoute)
    {this.id=this.router.snapshot.paramMap.get('id');}

    ngOnInit(): void {
        // console.log("Course ID:", this.id);
          this.dservice.productdatabyID(this.id).subscribe((data)=>{
          console.log("API Response:", data);
          this.Showproductdata = data;
        })
    }

}
