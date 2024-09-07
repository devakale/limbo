import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.css']
})
export class UserEventComponent implements OnInit {

  showeventdata: any[] = [];
  filteredEvent: any[] = [];


  constructor(private Dservice: DashboardService, private filter: FilterService) { }

  ngOnInit(): void {
    this.Dservice.Eventdata().subscribe(Response => {
      // console.log(Response);
      this.showeventdata = Response;
      this.filteredEvent = this.showeventdata;
    });
    this.filter.selectedCategories$.subscribe(selectedCategories => {
      if (selectedCategories.length > 0) {
        this.filteredEvent = this.showeventdata.filter((event: any) =>
          selectedCategories.includes(event.event_category.category_name)
        );
      } else {
        this.filteredEvent = this.showeventdata; // Show all courses if no category is selected
      }
    });
  }
}
