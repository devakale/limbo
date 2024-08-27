import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';

@Component({
  selector: 'app-relevance',
  templateUrl: './relevance.component.html',
  styleUrls: ['./relevance.component.css']
})
export class RelevanceComponent implements OnInit{

  Showcategorydata:any[]=[];
  selectedCategories: string[] = [];

  constructor(private service:DashboardService, private filter:FilterService){}

ngOnInit(): void {
  this.service.getcategoryname().subscribe(data => {
    this.Showcategorydata = data.categoriesWithFullImageUrl;
  });
}

onCategoryChange(categoryName: string, event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    this.selectedCategories.push(categoryName);
  } else {
    const index = this.selectedCategories.indexOf(categoryName);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    }
  }
  this.filter.updateSelectedCategories(this.selectedCategories);
}


}
