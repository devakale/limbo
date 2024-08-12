import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/common_service/admin.service';
import { LoginService } from 'src/app/common_service/login.service';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {




  showIcon = false;
  toggleIcon() {
    this.showIcon = !this.showIcon;
  }
  showCategorydata:any;
  showtrainerdata:any[]=[];
  showcoursedata:any;
  showtrainerdatabyID:any[]=[];
  

  thumbnail_image: File | null = null;

  Courses = {
    _id:' ',
    course_name:' ',
    category_id:' ',
    online_offline:' ',
    // trainer_id:' ',
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

  constructor(private admin:AdminService, private service:TrainerService, private login:LoginService ){}

  ngOnInit(): void{

    this.service.gettrainerdatabyID().subscribe((result:any) =>{
      console.log("Show course Data",result);
      this.showcoursedata = result.coursesWithFullImageUrl;
    })

    this.admin.getcategorydata().subscribe( data =>{
      // console.log("data",data)
      this.showCategorydata = data.categories;
    });

    this.admin.gettrainerdata().subscribe(data =>{
      console.log(data);
      this.showtrainerdata = data.allTrainers ;
    });

    this.service.gettrainerdatabyID().subscribe(data =>{
      console.log(data);
      this.showtrainerdatabyID = data.ByTrainerIdCourses;
    })
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

    successNotification() {
    }
  

}
