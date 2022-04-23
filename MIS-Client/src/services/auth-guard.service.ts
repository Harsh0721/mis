import { loginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(

    private Router: Router, 
    private loginService: loginService) 
    
    { }

   canActivate(){
     
    
    if( this.loginService.getUser()) return true;
    this.Router.navigate([''])
    return false;
    
   }
}
