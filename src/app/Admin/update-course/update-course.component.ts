import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/common_service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  showCategorydata: any[] = [];
  showtrainerdata: any[] = [];

  _id: any;
  uploadform!: FormGroup;
  thumbnail_image: File | null = null;

  constructor( 
    private router: ActivatedRoute,
    private admin: AdminService,
    private formb: FormBuilder,
    private route: Router
  ) {  
    this._id = this.router.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.uploadform = this.formb.group({
      _id: ['',Validators.required],
      course_name: ['',Validators.required],
      category_id: ['',Validators.required],
      online_offline: ['',Validators.required],
      trainer_id: ['',Validators.required],
      price: ['',Validators.required],
      offer_prize: ['',Validators.required],
      start_date: ['',Validators.required],
      end_date: ['',Validators.required],
      start_time: ['',Validators.required],
      end_time: ['',Validators.required],
      course_information: ['',Validators.required],
      thumbnail_image: ['',Validators.required] // This should be null for initialization
    });

    this.admin.getCourseById(this._id).subscribe(d => {
      console.log("Course Data",d);
      this.uploadform.patchValue({
        _id: d._id,
        course_name: d.course_name,
        category_id: d.category_id,
        online_offline: d.online_offline,
        trainer_id: d.trainer_id,
        price: d.price,
        offer_prize: d.offer_prize,
        start_date: d.start_date,
        end_date: d.end_date,
        start_time: d.start_time,
        end_time: d.end_time,
        course_information: d.course_information,
        // Note: Do not set thumbnail_image here; handle it in the file input
      });
      this.thumbnail_image = d.thumbnail_image; // Clear previous image
    });

    this.admin.getcategorydata().subscribe(data => {
      console.log(data);
      this.showCategorydata = data.categories;
    });

    this.admin.gettrainerdata().subscribe(data => {
      console.log(data);
      this.showtrainerdata = data.allTrainers;
    });
  }

  onFileSelected(event: any): void {
    this.thumbnail_image = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
        
    formData.append('_id',this.uploadform.get('_id')?.value);
    formData.append('course_name',this.uploadform.get('course_name')?.value);
    formData.append('category_id',this.uploadform.get('category_id')?.value);
    formData.append('online_offline',this.uploadform.get('online_offline')?.value);
    formData.append('trainer_id',this.uploadform.get('trainer_id')?.value);
    formData.append('price',this.uploadform.get('price')?.value);
    formData.append('offer_prize',this.uploadform.get('offer_prize')?.value);
    formData.append('start_date',this.uploadform.get('start_date')?.value);
    formData.append('end_date',this.uploadform.get('end_date')?.value);
    formData.append('start_time',this.uploadform.get('start_time')?.value);
    formData.append('end_time',this.uploadform.get('end_time')?.value);
    formData.append('course_information',this.uploadform.get('course_information')?.value);

      
    // Append file data if a file is selected
    if (this.thumbnail_image) {
      formData.append('thumbnail_image', this.thumbnail_image);
    }
  
    console.log('Form Data:', formData); // Log form data for debugging
  
    this.admin.updateCorseByID(this._id, formData).subscribe({
      next: response => {
        console.log('Update Response:', response); // Log response for debugging
        Swal.fire('Success', 'Course updated successfully!', 'success');
        this.route.navigate(['admin/admincourse'])
      },
      error: error => {
        console.error('Update failed', error); // Log error for debugging
        Swal.fire('Error', 'Error updating course.', 'error');
      }
    });
  }

}
