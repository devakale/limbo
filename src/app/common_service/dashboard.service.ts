import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private APIurl = "http://localhost:3000";
  // private TrainerURL ="http://localhost:3000/trainer"

  private categoryAPI="http://localhost:1000/category";

  constructor(private http:HttpClient) { }

  // getcategorydata():Observable<any>{
  //   return this.http.get<any>(this.categoryAPI);
  //  }
  
     getcategorydatadbjson():Observable<any>{
      return this.http.get<any>(`${this.APIurl}/category`);
     }

     gettrainerdata():Observable<any>{
      return this.http.get<any>(`${this.APIurl}/trainer`);
     }

     postcategorydata(data:any){
        return this.http.put(this.categoryAPI,data);
     }


     

    //  postdata(post:any){
    //   return this.http.post(this.APIurl+'/users',post);
    //   return this.http.post(`${this.APIurl}/users`,post);
    //  }

}
