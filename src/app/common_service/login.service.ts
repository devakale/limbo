import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

// ********************** Trainer LOGIN API **********************
    private register ='http://localhost:1000/registration';

  constructor(private http:HttpClient){ }

    login(data:any):Observable<any>{
      return this.http.post<any>(`${this.register}/login`,data);
    }
  
    postsignupdata(Signup:any):Observable<any>{
      return this.http.post<any>(this.register,Signup);
    }

}
