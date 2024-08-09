import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 private APIurl = "http://localhost:3000/users";
 private APIurl1 = "http://localhost:3000/sign-up";
 private demo="https://jsonplaceholder.typicode.com/posts";

 private loginUrl = 'http://localhost:1000/registration/login';

 private register ='http://localhost:1000/registration';

  constructor(private http:HttpClient) { }

    postregisterData(username: string, password: string): Observable<any> {
      const body = { username, password};
      return this.http.post(this.APIurl, body);
    }

    getLoginData(email_id: string, password: string): Observable<any> {
      return this.http.post<any>(this.loginUrl,{email_id,password} );
    }
  
    postsignupdata(Signup:any):Observable<any>{
      return this.http.post<any>(this.register,Signup);
    }

    getpostsdata():Observable<any>{
      return this.http.get<any>(this.demo);
    }

}
