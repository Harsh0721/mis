import { HttpClient } from '@angular/common/http';
import { loginService } from './login.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {

   User;

   private URL = '/api/announcements';

  constructor(private loginService : loginService, private http : HttpClient) {
    
      this.User = loginService.getUser();
  }



  getAnnouncements(){

    return this.http.get(this.URL);
  }


  makeNewAnnouncement(announcement: String){

    return this.http.post(
    
    this.URL + '/new', 

    {

      "announcement" : announcement,
      "isAdmin" : this.User.isAdmin,
      "email" : this.User.email,

    })

  }

  reply(id: String, reply: String){

    return this.http.put(this.URL + '/reply', {

      "isAdmin" : this.User.isAdmin,
      "reply" : reply,
      "id" : id,
      "email": this.User.email
    })

  }

  getAnnouncementById(id: String){

    return this.http.get( this.URL + '/' + id);
    
  }

}
