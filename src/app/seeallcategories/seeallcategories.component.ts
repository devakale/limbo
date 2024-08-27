import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';


@Component({
  selector: 'app-seeallcategories',
  templateUrl: './seeallcategories.component.html',
  styleUrls: ['./seeallcategories.component.css']
})
export class SeeallcategoriesComponent implements OnInit {

 
  Showcouserdata: any;
  p: number = 1; // Current page
  filteredCourses: any[] = [];


  constructor(private service: DashboardService, private filter:FilterService) {}

  ngOnInit(): void {
    
    this.service.getcouserdata().subscribe(result => {
      this.Showcouserdata = result.coursesWithFullImageUrl;
      this.filteredCourses = this.Showcouserdata; // Show all courses if no category is selected

    });

    this.filter.selectedCategories$.subscribe(selectedCategories => {
      if (selectedCategories.length > 0) {
        this.filteredCourses = this.Showcouserdata.filter((course:any) => 
          selectedCategories.includes(course.category_id.category_name)
        );
      } else {
        this.filteredCourses = this.Showcouserdata; // Show all courses if no category is selected
      }
    });

  }
}
