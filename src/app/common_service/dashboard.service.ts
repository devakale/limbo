import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   
  private beforelogin ="http://localhost:1000/beforeLogin"


  constructor(private http:HttpClient) { }



          getcategoryname():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/allcategory`);
          }

          getcouserdata():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/allcourses`)
          }

          getcouserdatabyID(id:any):Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/course/${id}`)
          }

          gettrainerdata():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/alltrainers`);
           }

           productdata():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/allproduct`);
           }

           Eventdata():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/allevents`);
           }

}
