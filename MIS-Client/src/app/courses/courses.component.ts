import { StudentCallsService } from './../../services/student-calls.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  isTeacher; 
  isStudent;
  register = false;
  view = true;

  displayAvCourses = false;
  displayMyCourses = false;
  redirect = window.history.state.redirect;

  courses: any;

  constructor(private router: Router, private StudentCallsService : StudentCallsService) {

    this.isTeacher = window.history.state.teacher;
    this.isStudent = !this.isTeacher;
    if(this.isStudent)
    {
      this.register = window.history.state.register;
      this.view = !this.register;
    }

    this.courses = window.history.state.courses;
    console.log(window.history.state);
  }

  back(){

      this.router.navigate( [window.history.state.redirect] );
  }


  registerInCourse(course: String){

    
    this.StudentCallsService.addCourse(course)
    .subscribe( 
      
    response=>
    {
          alert('registered succesfully..')
    },
    error=>
    {

      if(error.status === 409)
      {
        alert('Already Registered');
      }
      else
      {
        alert('Cant register due to unexpected error' );
      }
      
    })
  }

 
}
