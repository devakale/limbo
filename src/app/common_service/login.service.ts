import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

//********************** Trainer LOGIN API **********************


    private register ='http://localhost:1000/registration';

    private institute="http://localhost:1000/institute";

    private APIURL ="http://localhost:1000/notifications";
  

  constructor(private http:HttpClient, private router: Router){ }

    login(data:any):Observable<any>{
      return this.http.post<any>(`${this.register}/login`,data);
    }
  
    postsignupdata(Signup:any):Observable<any>{
      return this.http.post<any>(this.register,Signup);
    }

    forgotpassword(data: { email_id: string }):Observable<any>{
      return this.http.post<any>(`${this.register}/forget-password`,data)
    }

    postrequest(data:any):Observable<any>{
      return this.http.post<any>(`${this.register}/request-role-change`,data)
    }

    getrolerequest():Observable<any>{
      return this.http.get<any>(`${this.register}/all-rolechange-request`)
    }

    RoleChange(data: { userid: string, approved: number }): Observable<any> {
      return this.http.post<any>(`${this.register}/approve-role-change`, data);
   }
  
   postinstitute(data:any):Observable<any>{
    return this.http.post<any>(`${this.institute}/create-institute`,data);
   }

   GetInstitute():Observable<any>{
    return this.http.get<any>(`${this.institute}/get-institutes`);
   }

   Notification(page: number, limit: number):Observable<any>{
    let headers = new HttpHeaders()
    .set("Authorization", `Bearer ${sessionStorage.getItem('Authorization')}`)
    return this.http.get<any>(`${this.APIURL}/unseen?page=${page}&limit=${limit}`,{headers});
  }
}
  // getcouserdata(page: number, limit: number):Observable<any>{
  //   return this.http.get<any>(`${this.beforelogin}/allcourses?page=${page}&limit=${limit}`)
  // }


