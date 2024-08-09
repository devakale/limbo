import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';


@Component({
  selector: 'app-seeallcategories',
  templateUrl: './seeallcategories.component.html',
  styleUrls: ['./seeallcategories.component.css']
})
export class SeeallcategoriesComponent implements OnInit {

  showCategorydata: any[] = []; // Initialize with an empty array
  allData: any[] = []; // Initialize with an empty array
  filteredData: any[] = []; // Array to hold the filtered data
  selectedCategories: string[] = [];
  uniqueCategories: Set<string> = new Set(); // Use a Set to store unique categories

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getcategorydatadbjson().subscribe((data: any[]) => {
      this.allData = data;
      this.filteredData = data; // Initialize filteredData with all data
      this.extractUniqueCategories(); // Extract unique categories
    });
  }

  extractUniqueCategories() {
    this.allData.forEach(item => {
      this.uniqueCategories.add(item.c_name); // Add each category to the Set
    });
  }

  onCategoryChange(category: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked; // Cast to HTMLInputElement to access checked
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.filterData();
  }

  filterData() {
    if (this.selectedCategories.length > 0) {
      this.filteredData = this.allData.filter(item =>
        this.selectedCategories.includes(item.c_name)
      );
    } else {
      this.filteredData = this.allData;
    }
  }
}
