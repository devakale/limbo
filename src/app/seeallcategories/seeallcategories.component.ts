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
  itemsPerPage = 8; 
  ShowCourseData: any[] = [];   
  filteredCourses: any[] = [];  
  selectedCategories: string[] = []; 
  p: number = 1;

  constructor(private service: DashboardService, private filter: FilterService) {}

  ngOnInit(): void {
    this.loadCourses(this.currentPage, this.itemsPerPage);

    // Subscribe to selected categories from FilterService
    this.filter.selectedCategories$.subscribe(selectedCategories => {
      this.selectedCategories = selectedCategories;
      this.filteredCourses = this.ShowCourseData;
      this.applyFilter();
    });
  }

  // Fetch courses from the backend
  loadCourses(page: number, limit: number): void {
    this.service.getcouserdata(page, limit).subscribe(result => {
      console.log(result);
      
      this.ShowCourseData = result.coursesWithFullImageUrl;
      this.totalItems = result.pagination.totalItems;
      this.applyFilter();  // Apply the filter after loading courses
    });
  }

  // Apply filtering logic based on selected categories
  applyFilter(): void {
    if (this.selectedCategories.length > 0) {
      this.filteredCourses = this.ShowCourseData.filter((course: any) => 
        this.selectedCategories.includes(course.category_id.category_name)
      );
    } else {
      this.filteredCourses = this.ShowCourseData;  // No filtering if no categories selected
    }
  }

  // Handle page change for pagination
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCourses(this.currentPage, this.itemsPerPage); 
    this.p = page;
  }
}
