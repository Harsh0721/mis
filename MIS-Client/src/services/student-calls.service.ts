import { HttpClient } from '@angular/common/http';
import { loginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentCallsService {


  private url = '/api/student/courses'
  User: any;

  constructor( private loginService: loginService , private http: HttpClient) { 

        this.User = loginService.getUser();
  }


 getcoursesRegistered(){

    return this.http.get(this.url + '/registered/' + this.User.email);
 }

 getCoursesAvailable(){

      return this.http.get(this.url + '/available');
 }

  addCourse(courseName: String){

   return this.http.put(this.url, { "courseName" : courseName, "email" : this.User.email  } )
 }
}
