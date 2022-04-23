import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { loginService } from '../../services/login.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {


  constructor(private loginService: loginService, private router: Router){
    
  }

  post:any;
  loggedIn:any;

  login(f: any){
    
      
      
      let credentials = {
        userName: f.value.userName,
        password: f.value.password,
        email: f.value.email
      }
      
      
      this.loginService.login(credentials).subscribe(
        (response:any) =>{
          
          localStorage.setItem('token', response);

          let token = this.loginService.getUser();

          if(!token)
          {
              this.router.navigate(['']) 
          }
          else if( token.isAdmin)
          {
              this.router.navigate( ['teacher' ] )
          }
          else this.router.navigate(['student']) 

          
        },
        error=>{
          console.log(error);
        })

        
       
  }

}
