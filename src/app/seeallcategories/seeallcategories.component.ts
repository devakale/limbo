import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';


@Component({
  selector: 'app-seeallcategories',
  templateUrl: './seeallcategories.component.html',
  styleUrls: ['./seeallcategories.component.css']
})
export class SeeallcategoriesComponent implements OnInit {

  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 8; // Match this with your server-side pagination limit
  ShowCourseData: any;
  filteredCourses: any[] = [];
  p: number = 1; // This is for ngx-pagination

  constructor(private service: DashboardService, private filter:FilterService) {}

  ngOnInit(): void {

    this.loadCourses(this.currentPage, this.itemsPerPage);

    this.filter.selectedCategories$.subscribe(selectedCategories => {
      if (selectedCategories.length > 0) {
        this.filteredCourses = this.ShowCourseData.filter((course:any) => 
          selectedCategories.includes(course.category_id.category_name)
        );
      } else {
        this.filteredCourses = this.ShowCourseData; // Show all courses if no category is selected
      }
    });

  }

  loadCourses(page: number, limit: number): void {
    this.service.getcouserdata(page, limit).subscribe(result => {
      console.log("data",result);
      this.ShowCourseData = result.coursesWithFullImageUrl;
      this.totalItems = result.pagination.totalItems; // Get total items from the response
      this.filteredCourses = this.ShowCourseData; // Show all courses if no category is selected

    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCourses(this.currentPage, this.itemsPerPage); // Fetch data for the new page
    this.p = page;
  }

  

  
}

