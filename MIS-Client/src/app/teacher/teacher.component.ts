import { AnnouncementService } from './../../services/announcement.service';
import { HttpCallService } from './../../services/http-call.service';
import { loginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent  {


  courses : any
  constructor( private AnnouncementService : AnnouncementService,private router: Router,private loginService : loginService, private HttpCallService : HttpCallService) {

    this.getCourses();
  }


  
  hideAddCourse =  true;
  hideGetCourse = true;
  errorInAddingCourse = false;
  errorInGettingCourse = false;
  makeAnnouncement = false;



  redirect(dest: string){
    
    this.router.navigate( [dest], { state:{ 'redirect' : 'hello'} }  );
    console.log(window.history.state);
  }

  addCourse(f: HTMLInputElement){
    
    this.hideAddCourse = false;
    this.HttpCallService.addCourse(f.value)
    .subscribe( 
    
     Response =>{
       alert('Course added succesfully')
       this.getCourses();
     },

    error=>
    {
        if(error.status === 409)
        {
            alert("already exists");
        }
        else
        {
            alert("unexpected error")
        }
    })

    this.hideAddCourse = true;
  
  }

  getCourses(){

    this.hideGetCourse=false
    let user = this.loginService.getUser();

    this.HttpCallService.getcourses(user.email).
    subscribe(  
    
      (Response:any) =>
      {  
          this.courses = Response; 
      },

      error =>
      { 
         alert("Can't display due to unexpected error")
      
      })    

  }


  newAnnouncement(f : HTMLInputElement){

    this,this.makeAnnouncement = false;

    this.AnnouncementService.makeNewAnnouncement(f.value)
    .subscribe(

      response =>
      {
          alert('done');
      },
      error => 
      {
        alert('error in making announcement')
      }
    )

  }

}
