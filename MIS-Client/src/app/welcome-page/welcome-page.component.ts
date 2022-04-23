import { loginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent  {

  constructor(private loginService: loginService) { 

    localStorage.removeItem('token');
  }

  
  
}
