import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';


@Component({
  selector: 'app-seeallcategories',
  templateUrl: './seeallcategories.component.html',
  styleUrls: ['./seeallcategories.component.css']
})
export class SeeallcategoriesComponent implements OnInit {

  Showcategorydata: any;
  Showcouserdata: any;
  filteredCourses: any[] = [];
  selectedCategories: string[] = [];

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getcategoryname().subscribe(data => {
      this.Showcategorydata = data.categoriesWithFullImageUrl;
    });

    this.service.getcouserdata().subscribe(result => {
      this.Showcouserdata = result.coursesWithFullImageUrl;
      this.filteredCourses = this.Showcouserdata; // Initially show all courses
    });
  }

  onCategoryChange(category: string, event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.filterCourses();
  }

  filterCourses(): void {
    if (this.selectedCategories.length > 0) {
      this.filteredCourses = this.Showcouserdata.filter((course:any) =>
        this.selectedCategories.includes(course.category_id.category_name)
      );
    } else {
      this.filteredCourses = this.Showcouserdata;
    }
  }




  // Showcategorydata:any;
  // Showcouserdata:any;
  //   constructor(private service:DashboardService){}

  // ngOnInit(): void {
  //     this.service.getcategoryname().subscribe(data =>{
  //       this.Showcategorydata=data.categoriesWithFullImageUrl;
  //     });

  //     this.service.getcouserdata().subscribe(result => {
  //       this.Showcouserdata = result.coursesWithFullImageUrl;
  //     })
  // }

 
}
