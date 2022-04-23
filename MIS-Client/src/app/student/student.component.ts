import { loginService } from './../../services/login.service';
import { StudentCallsService } from './../../services/student-calls.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})



export class StudentComponent {

  constructor(private StudentCallsService: StudentCallsService, private loginService : loginService ) { 

    this.getCoursesAvailable();
    this.getCoursesRegistered();
  }

  myCourses: any;
  avCourses: any;
  displayMyCourses = false;
  addCourse = false;
  displayAvCourses = false;
  studentName = this.loginService.getUser().userName;




  getCoursesAvailable(){

    this.StudentCallsService.getCoursesAvailable()
    .subscribe(

      response => 
      {
          this.avCourses = response;
      },

      error=>
      {
          alert('cant get courses..');
      }
    )

  }


  getCoursesRegistered(){

    this.displayMyCourses = true;

    this.StudentCallsService.getcoursesRegistered()
    .subscribe( 
      
      Response=>{
      this.myCourses = Response;
      },
      error=>{
        alert('error while getting courses');
      })
  }

}
