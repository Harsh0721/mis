import { CanActivate, Router } from '@angular/router';
import { loginService } from './login.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class TeacherGuard implements CanActivate {

  constructor(private router: Router, private loginService: loginService) { }

  canActivate(){
     
    let token = this.loginService.getUser();

    if(!token)
    {
        this.router.navigate(['']) 
        return false;
    }

    if( token.isAdmin)
    {
        return true;
    }

    this.router.navigate(['']) 
    // navigate to student page
    return false;
    
   }


}
