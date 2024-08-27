import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/common_service/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent  implements OnInit{

  showeventdata:any;

  event = {
    event_name: ' ',
    event_type: ' ',
    event_categories: ' ',
    event_start_time: ' ',
    event_end_time: ' ',
  };

  constructor(private service:TrainerService){}

  ngOnInit(): void {

      this.service.gettrainerdatabyID().subscribe(data=>{
        console.log(data);
        this.showeventdata = data.eventsWithThumbnailUrl;
      });
  }

  onSubmit() {
    const eventData = {
      event_name: this.event.event_name,
      event_type: this.event.event_type,
      event_categories: this.event.event_categories,
      event_start_time: this.event.event_start_time,
      event_end_time: this.event.event_end_time,
    };
  
    this.service.AddEvent(eventData).subscribe({
      next: (response) => {
        Swal.fire('Ohh...!', 'Event Added Successfully..!', 'success');
        window.location.reload();
      },
      error: (error) => {
        console.error("Error", error);
        Swal.fire('Error', 'Please fill the details', 'error');
      }
    });
  }

  onDelete(id: string): void {
    this.service.deleteEvent(id).subscribe(
      response => {
        // console.log('Data deleted successfully', response);
        alert("Event deleted successfully");
        window.location.reload();
      },
      error => {
        // console.error('Error deleting data', error);
        alert("Error");
      }
    );

  }
}
