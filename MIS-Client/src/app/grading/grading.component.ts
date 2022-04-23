import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent {

  id = window.history.state.courseId;
  URL = '/api/courses'
  courseName = window.history.state.courseName;
  students : any
  grade : any
  
  redirect = window.history.state.redirect;
  register = window.history.state.register
  isTeacher = window.history.state.teacher;
  courses = window.history.state.courses;

  constructor(private http : HttpClient) { 
    this.getStudentsEnrolled();
    let len = this.getStudentsEnrolled.length;

    this.grade = new Array(len).fill(false);

  }


  getStudentsEnrolled(){

    this.http.get(this.URL + '/' + this.courseName )
    .subscribe(
      (Respone :any) => 
      {
          this.students = Respone.studentsEnrolled
      },
      error =>
      {
        alert('error while retrieving students');
      }
    )

  }

  updateGrade(grade : HTMLInputElement, studentEmail : any)
  {

      let body = {
        "courseName" : this.courseName,
         "email" : studentEmail,
         "grade" : grade.value
      }

      console.log(grade);

      this.http.put('/api/student/grade', body)
      .subscribe(
        Response => 
        {
          alert('graded sucessfully')
        },
        error =>
        {
          alert('error in grading')
        }
      )
  }

}


