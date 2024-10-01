import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../common_service/dashboard.service';
import { FilterService } from '../common_service/filter.service';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  showtrainerData: any[] = [];
  filteredtrainer: any[] = [];
  selectedCategories: string[] = []; 
  searchTerm: string = ''; // New property for search term
  page = 0;
  limit = 4;
  
  constructor(private service: DashboardService, private filter: FilterService,
    private http: HttpClient, private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.service.gettrainerdata().subscribe(data => {
      this.showtrainerData = data.trainers;
      console.log(this.showtrainerData);
      this.filterTrainers(); // Initial filter
    });

    this.filter.selectedCategories$.subscribe(categories => {
      this.selectedCategories = categories;
      this.filterTrainers(); // Re-filter on category selection
    });

    // Subscribe to search term changes
    this.searchService.currentSearchData.subscribe(term => {
      this.searchTerm = term;
      console.log('Received search term in TrainerComponent:', this.searchTerm);
      this.fetchTrainer(); // Fetch trainers based on search term
    });
  }

  filterTrainers(): void {
    this.filteredtrainer = this.showtrainerData; // Start with all fetched trainers
  
    if (this.searchTerm) {
      this.filteredtrainer = this.filteredtrainer.filter(trainer =>
        trainer.Business_Name && 
        trainer.Business_Name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    if (this.selectedCategories.length > 0) {
      this.filteredtrainer = this.filteredtrainer.filter(trainer =>
        this.selectedCategories.includes(trainer.category_id?.toString()) 
      );
    }
  
    console.log('Filtered Trainers:', this.filteredtrainer); 
  }
  
  
  fetchTrainer(): void {
    if (this.searchTerm) {
      this.http.get<any>(`http://localhost:1000/search/trainer?trainer_name=${this.searchTerm}`)
        .subscribe(
          (response) => {
            console.log('API Response:', response); // Log the whole response
  
            if (response && response.trainers) {
              this.showtrainerData = response.trainers; // Update showtrainerData with search results
            } else {
              this.showtrainerData = []; // Fallback to an empty array if no data
            }
  
            console.log('Fetched Trainers:', this.showtrainerData); // Log fetched data
            this.filterTrainers(); // Apply filter after fetching trainers
          },
          (error) => {
            console.error('Error fetching trainers:', error);
            this.showtrainerData = []; // Fallback to an empty array on error
            this.filterTrainers(); // Apply filter with no trainers
          }
        );
    } else {
      // If no search term, reload all trainers
      this.service.gettrainerdata().subscribe(data => {
        this.showtrainerData = data.trainers || []; // Ensure this is an array
        this.filterTrainers(); // Filter with all trainers
      });
    }
  }
  

}


// import { Component, OnInit } from '@angular/core';
// import { DashboardService } from '../common_service/dashboard.service';
// import { FilterService } from '../common_service/filter.service';

// @Component({
//   selector: 'app-trainer',
//   templateUrl: './trainer.component.html',
//   styleUrls: ['./trainer.component.css']
// })
// export class TrainerComponent implements OnInit{
//   showtrainerData:any;
//   filtertrainer:any[] = [];

//   page = 0;
//   limit = 4;
  
//   constructor(private service:DashboardService, private filter: FilterService){}

//   ngOnInit(): void {

//     this.service.gettrainerdata().subscribe(data =>{
//       this.showtrainerData=data.trainers;
//       this.filtertrainer = this.showtrainerData;
//     });
//     // this.service.gettrainerdata().subscribe(data =>{
//     //   console.log(data);
      
//     //   this.showtrainerData=data.trainers;
//     //   this.filtertrainer = this.showtrainerData;
//     //   // console.log(this.filtertrainer);
      
//     // });
//     this.filter.selectedCategories$.subscribe(selectedCategories => {
//       if (selectedCategories.length > 0) {
//         this.filtertrainer = this.showtrainerData.filter((trainer: any) =>
//           selectedCategories.includes(trainer.f_Name.category_id)        
//         );
//       } else {
//         this.filtertrainer = this.showtrainerData; // Show all courses if no category is selected
//       }
//     });
//   }

// }
