import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   
  private beforelogin ="http://localhost:1000/beforeLogin"

  private Enroll ="http://localhost:1000/enrollcourse"

  private SEOkeyword="http://localhost:1000/footer"


  constructor(private http:HttpClient) { }



          getcategoryname():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/allcategory`);
          }

          getcouserdata():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/allcourses`)
          }

          gethomedatauser(page: number, limit: number):Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/home?page=${page}&limit=${limit}`)
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

           productdatabyID(id:any):Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/product/${id}`);
           }


           Eventdata():Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/allevents`);
           }

           EventdatabyID(id:any):Observable<any>{
            return this.http.get<any>(`${this.beforelogin}/event/${id}`);
           }

           courseenroll(data:{course_id: string}): Observable<any> {
            return this.http.post<any>(`${this.Enroll}`, data);
        }

        SEOkeywords():Observable<any>{
          return this.http.get<any>(this.SEOkeyword);
        }
}
