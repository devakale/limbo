import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private APIURL="http://localhost:3000/trainer";

  private CategoryURL="http://localhost:1000/category";

  private Cousers_API="http://localhost:1000/course";

  private trainer_API="http://localhost:1000/registration"




  constructor(private http:HttpClient) { }

  // Category API Code Start From here

      postCategory(name: string, image: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('category_name', name);
        formData.append('category_image', image);
        return this.http.post(this.CategoryURL, formData);
      }

      getcategorydata():Observable<any>{
        return this.http.get<any>(this.CategoryURL);
      }

      deletecategorybyID(_id: string): Observable<any> {
        const url = `${this.CategoryURL}/${_id}`;
        return this.http.delete(url);
      }

      // getcategorydatabyID(C_ID:any): Observable<any>{
      //   return this.http.get(`${this.CategoryURL}/${C_ID}`);
      // }

      // public updatecategorydata(id:any,data:any): Observable<any> {
      //   return this.http.put<any>(`${this.CategoryURL}/${id}`,data);

      // }

      // getcategorydatabyID(id: string): Observable<any> {
      //   return this.http.get(`${this.CategoryURL}/categories/${id}`);
      // }
    
      // updatecategorydata(id: string, data: any): Observable<any> {
      //   return this.http.put(`${this.CategoryURL}/categories/${id}`, data);
      // }

      getCategoryById(id: string): Observable<any> {
        return this.http.get(`${this.CategoryURL}/${id}`);
      }
    
      // Method to update category data
      updateData(id: string, updatedData: FormData): Observable<any> {
        return this.http.put(`${this.CategoryURL}/${id}`, updatedData);
      }

     // Category API Code End here

  // Courses API Code Start From here

      // postcoursesdata(postdata:any):Observable<any>{
      //   return this.http.post<any>(this.Cousers_API,postdata)
      // }


      // gettrainerdatabyID():Observable<any>{
      //   let headers = new HttpHeaders()
      //   .set("Authorization", `Bearer ${sessionStorage.getItem('Authorization')}`)
      //    return this.http.get<any>("http://localhost:1000/trainers",{headers});
      //  }

      postcoursesdata(courseData: FormData): Observable<any> {
        let headers = new HttpHeaders()
        .set("Authorization", `Bearer ${sessionStorage.getItem('Authorization')}`)
        return this.http.post(this.Cousers_API, courseData,{headers});
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
