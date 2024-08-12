import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  
  Trainer_API ="http://localhost:1000/trainers";

  private Cousers_API="http://localhost:1000/course";

  private product_API ="http://localhost:1000/product";

  private Event_API="http://localhost:1000/event"

  private Appointment="http://localhost:1000/appointment";

  private login="http://localhost:1000/registration";

  constructor(private http:HttpClient) { }


  

  //LOGIN TRAINER API

      logintrainer():Observable<any>{
        return this.http.get<any>(this.login);
      }

  // Courses API

  gettrainerdatabyID():Observable<any>{
    let headers = new HttpHeaders()
    .set("Authorization", `Bearer ${sessionStorage.getItem('Authorization')}`)
     return this.http.get<any>("http://localhost:1000/trainers",{headers});
   }


  deleteCoursebyID(_id: string): Observable<any> {
    let headers = new HttpHeaders()
    .set("Authorization", `Bearer ${sessionStorage.getItem('Authorization')}`)
    return this.http.delete(`${this.Cousers_API}/${_id}`,{headers});
  }

  updateCorseByID(CID: any, CDATA:FormData):Observable<any>{
    return this.http.put<any>(`${this.Cousers_API}/${CID}`,CDATA);
  }

  // Event API

     geteventdata():Observable<any>{
       return this.http.get<any>(`${this.Trainer_API}`)
     }

     deleteEnquiryBYID(_id: string):Observable<any>{
     return this.http.delete<any>(`${this}/${_id}`)
    }
    
    AddEvent(eventData: any): Observable<any> {
      return this.http.post<any>(this.Event_API, eventData);
    }

    deleteEvent(_id:any):Observable<any>{
      return this.http.delete<any>(`${this.Event_API}/${_id}`)
    }

    geteventbyID(_id:any):Observable<any>{
      return this.http.get<any>(`${this.Event_API}/${_id}`);
    }

    UpdateEventbyID(_id : any, formData:any):Observable<any>{
      return this.http.put<any>(`${this.Event_API}/${_id}`,formData)
    }


  // Product API

  addProduct(productData: FormData): Observable<any> {
    return this.http.post(this.product_API, productData);
  }

     deleteproductBYID(_id: string):Observable<any>{
    return this.http.delete<any>(`${this.product_API}/${_id}`);
    }

    getproductById(_id:string):Observable<any>{
      return this.http.get<any>(`${this.product_API}/${_id}`);
    }

    updateproductbyID(_id : string, formData:FormData):Observable<any>{
      return this.http.put<any>(`${this.product_API}/${_id}`,formData)
    }

    //Appointment
    deleteAppointmentbyID(_id: string):Observable<any>{
      return this.http.delete<any>(`${this.Appointment}/${_id}`);
      }

}
