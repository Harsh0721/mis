import { AnnouncementService } from './../../services/announcement.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css']
})
export class RepliesComponent  {

  
  replies : any;
  announcement : String
  redirect = window.history.state.redirect;

  replyNew = false;

  

  constructor(private AnnouncementService : AnnouncementService ,private router : Router) { 

    this.replies = window.history.state.reply;
    this.announcement = window.history.state.announcement;
    console.log(window.history.state);

  }

  back(){
    this.router.navigate( ['announcements'] )
  }

  newReply(input: HTMLInputElement)
  {
      this.AnnouncementService.reply(window.history.state.id ,input.value)
      .subscribe(
        Response =>
        {
          alert('replied succesfully');

            this.getReplies(window.history.state.id);
        },
        error => 
        {
          alert('cant reply');
        }
      )
    
  }
  
  getReplies(id: String)
  {
    this.AnnouncementService.getAnnouncementById( window.history.state.id)
    .subscribe(
      (Response : any)  => 
      {
          this.replies = Response.replies;
          alert('replied sucessfully');
      },
      error =>
      {
          alert('error while replying')
      }
    )
  }


}
