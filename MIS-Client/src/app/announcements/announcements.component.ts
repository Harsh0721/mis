import { loginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { AnnouncementService } from './../../services/announcement.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})




export class AnnouncementsComponent  {


   redirect = '';

  constructor(private loginService : loginService ,private router: Router, private AnnouncementService : AnnouncementService) {

    console.log(this.loginService.getUser() );

      this.redirect = history.state.redirect;
      this.getAnnouncements();
  }
    

  announcements : any

  backToPrevious(){
    
    this.router.navigate( [ this.redirect ] );
  }




  getAnnouncements() {

    this.AnnouncementService.getAnnouncements()
    .subscribe(
      
      Response => 
      {
          this.announcements = Response;
      },

      error =>
      {
           alert('error in getting annoucnements');
      }
    )
    
  }
    

}
