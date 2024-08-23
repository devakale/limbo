import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  _id: any;
  uploadform!: FormGroup;


  constructor(
    private router: ActivatedRoute, 
    private service: TrainerService, 
    private formb: FormBuilder,
    private route:Router
  ) {  
    this._id = this.router.snapshot.paramMap.get('_id');
  }

  ngOnInit() {
    this.uploadform = this.formb.group({
      _id: [''],
      event_name:['', Validators.required],
      event_type:['',Validators.required],
      event_categories:['',Validators.required],
      event_start_time:['',Validators.required],
      event_end_time:['',Validators.required],

    });

    this.service.geteventbyID(this._id).subscribe((d:any) => {
      console.log('event data:', d);
      this.uploadform.patchValue({
        _id: d._id,
        event_name:d.event_name,
        event_type:d.event_type,
        event_categories:d.event_categories,
        event_start_time:d.event_start_time,
        event_end_time:d.event_end_time,        
      });
    });
  }



  onSubmit() {
    const formData = new FormData();
    formData.append('event_name',this.uploadform.get('event_name')?.value);
    formData.append('event_type',this.uploadform.get('event_type')?.value);
    formData.append('event_categories',this.uploadform.get('event_categories')?.value);
    formData.append('event_start_time',this.uploadform.get('event_start_time')?.value);
    formData.append('event_end_time',this.uploadform.get('event_end_time')?.value);  

    this.service.UpdateEventbyID(this._id, formData).subscribe({
      next: (response) => {
        console.log('Response:', response);
        Swal.fire('Success', 'Course updated successfully!', 'success');
        this.route.navigate(['/trainer/event']);
      },
      error: error => {
        console.error('Update failed', error);
        Swal.fire('Error', 'Error updating course.', 'error');
      }
    });
  }

}
