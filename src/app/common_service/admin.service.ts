import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private APIURL="http://localhost:1000/trainer";

  private CategoryURL="http://localhost:1000/beforeLogin/allcategory";

  private dashboard="http://localhost:1000/beforeLogin/allcategory"

  private Cousers_API="http://localhost:1000/course";

  private trainer_API="http://localhost:1000/registration"




  constructor(private http:HttpClient) { }

  // ******************** Category API ***********************

      postCategory(name: string, image: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('category_name', name);
        formData.append('category_image', image);
        return this.http.post(this.CategoryURL, formData);
      }

      getcategorydata():Observable<any>{
        return this.http.get<any>(this.CategoryURL);
      }

      getcategorydatadashboard():Observable<any>{
        return this.http.get<any>(this.dashboard);
      }

      deletecategorybyID(_id: string): Observable<any> {
        const url = `${this.CategoryURL}/${_id}`;
        return this.http.delete(url);
      }

      getCategoryById(id: string): Observable<any> {
        return this.http.get(`${this.CategoryURL}/${id}`);
      }
    
      updateData(id: string, updatedData: FormData): Observable<any> {
        return this.http.put(`${this.CategoryURL}/${id}`, updatedData);
      }

  // Category API Code End here

  // ******************** Courses API ***********************

      postcoursesdata(courseData: FormData): Observable<any> {
        return this.http.post(this.Cousers_API, courseData);
      }

      getcoursedata():Observable<any>{
        return this.http.get(this.Cousers_API);
      }

      deletCoursebyID(_id: string): Observable<any> {
        const url = `${this.Cousers_API}/${_id}`;
        return this.http.delete(url);
      }

      getCourseById(id: string): Observable<any> {
        return this.http.get(`${this.Cousers_API}/${id}`);
      }

      updateCorseByID(id: any, cdata: FormData): Observable<any> {
        return this.http.put<any>(`${this.Cousers_API}/${id}`, cdata);
      }

      gettrainerdata():Observable<any>{
        return this.http.get<any>(this.trainer_API);
      }
}
