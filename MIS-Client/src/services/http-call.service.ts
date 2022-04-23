import { loginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {

    private url = '/api/teacher/courses'

     User: any;

  constructor( private loginService: loginService , private http: HttpClient) { 

    this.User = loginService.getUser();
  }
  

    getcourses(email: String){

      return this.http.get(this.url + '/' + email);
    }


    addCourse(courseName: String){


      return this.http.put(this.url, {"teacherName" : this.User.userName, "courseName" : courseName, "email" : this.User.email  } )
    }
}
