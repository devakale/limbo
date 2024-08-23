import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private APIurl = "http://localhost:3000";
   
  private beforelogin ="http://localhost:1000/beforeLogin"


  // private TrainerURL ="http://localhost:3000/trainer"

  private categoryAPI="http://localhost:1000/category";

  constructor(private http:HttpClient) { }



          getcategoryname():Observable<any>{
            return this.http.get<any>(this.beforelogin);
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

  // getcategorydata():Observable<any>{
  //   return this.http.get<any>(this.categoryAPI);
  //  }
  
     getcategorydatadbjson():Observable<any>{
      return this.http.get<any>(`${this.APIurl}/`);
     }


    

     postcategorydata(data:any){
        return this.http.put(this.categoryAPI,data);
     }


     

    //  postdata(post:any){
    //   return this.http.post(this.APIurl+'/users',post);
    //   return this.http.post(`${this.APIurl}/users`,post);
    //  }

}
