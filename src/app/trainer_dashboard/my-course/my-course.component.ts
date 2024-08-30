import { Component, ViewChild, OnInit } from '@angular/core';
import { AdminService } from 'src/app/common_service/admin.service';
import { AuthServiceService } from 'src/app/common_service/auth-service.service';
import { LoginService } from 'src/app/common_service/login.service';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  isTrainer: boolean = false;
  isUser: boolean = true; // Example default value; adjust as needed


  checkUserRole() {
    const role = this.auth.getUserRole();
    // console.log(role);
    this.isTrainer = role === 'TRAINER';
    this.isUser = role === 'USER'  || role === 'TRAINER' ;
  }


  showIcon = false;
  toggleIcon() {
    this.showIcon = !this.showIcon;
  }
  showCategorydata:any;
  showcoursedata:any;
  

  thumbnail_image: File | null = null;

  Courses = {
    course_name:' ',
    category_id:' ',
    online_offline:' ',
    price:' ',
    offer_prize:' ',
    start_date:' ',
    end_date:' ',
    start_time:' ',
    end_time:' ',
    course_information:' ',
    thumbnail_image:' ',
    gallary_image:' ',
    trainer_materialImage:' ',
  };

  constructor(private admin:AdminService, private service:TrainerService,private auth: AuthServiceService ){}

  

  ngOnInit(): void{

    this.checkUserRole();

    this.service.gettrainerdatabyID().subscribe((result:any) =>{
      // console.log("Show course Data",result);
      this.showcoursedata = result.coursesWithFullImageUrl;
    })

    this.admin.getcategorydata().subscribe( data =>{
      // console.log("data",data)
      this.showCategorydata = data.categoriesWithFullImageUrl;
    });
    

  }

    onsubmit(): void {
    const formData = new FormData();
    for (const key in this.Courses) {
      if (this.Courses.hasOwnProperty(key)) {
        formData.append(key, (this.Courses as any)[key]);
      }
    }
    if (this.thumbnail_image) {
      formData.append('thumbnail_image', this.thumbnail_image);
    }

    this.admin.postcoursesdata(formData).subscribe({
      next: (response) => {
        Swal.fire('Ohh...!', 'Course Added Successfully..!', 'success').then(() => {
                // Close the modal
                const modalCloseButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]') as HTMLElement;
                if (modalCloseButton) {
                  modalCloseButton.click();
                }
                window.location.reload();               
              });
      },
      error: (error) => {
        console.error("Error", error);
        Swal.fire('Error', 'Please fill the datails', 'error');
      }
    }); 
   }

    onFileSelected(event: any): void {
      this.thumbnail_image = event.target.files[0];
    }


    onDelete(id: string): void {
      this.service.deleteCoursebyID(id).subscribe(
        response => {
          // console.log('Data deleted successfully', response);
          alert("Course deleted successfully");
          window.location.reload();
        },
        error => {
          // console.error('Error deleting data', error);
          alert("Error");
        }
      );
      
    }

   
  

}
