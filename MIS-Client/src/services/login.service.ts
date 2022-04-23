import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable( {
    providedIn : 'root'
})


export class loginService{

       private url = '/api/login';

       constructor(private http: HttpClient){
        
       }

        login(credentials: any)
        {   
            return this.http.post(this.url, credentials);
        }

        getUser() {

             let token = localStorage.getItem('token');
             if(!token)return null;
             
            
             let jwtHelper = new JwtHelperService();
             
             return jwtHelper.decodeToken(token);
        }

}