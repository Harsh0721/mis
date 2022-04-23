import { TeacherGuard} from './../services/teacher-guard.service';
import { AuthGuard } from '../services/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RepliesComponent } from './replies/replies.component';
import { CoursesComponent } from './courses/courses.component';
import { LogoutComponent } from './logout/logout.component';
import { DeveloperComponent } from './developer/developer.component';
import { GradingComponent } from './grading/grading.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomePageComponent,
    TeacherComponent,
    StudentComponent,
    AnnouncementsComponent,
    RepliesComponent,
    CoursesComponent,
    LogoutComponent,
    DeveloperComponent,
    GradingComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot( [

     

      {path: '', component: WelcomePageComponent},

      {path: 'teacher', component:  TeacherComponent, canActivate :[TeacherGuard]},

      {path: 'student', component : StudentComponent, canActivate : [AuthGuard] },

      {path: 'announcements', component : AnnouncementsComponent, canActivate : [AuthGuard]},

      {path: 'replies', component :RepliesComponent , canActivate : [AuthGuard]},

      {path: 'courses', component: CoursesComponent , canActivate : [AuthGuard]},

      {path: 'grading', component : GradingComponent, canActivate : [AuthGuard] },
       
      {path : 'developer', component : DeveloperComponent},
      
      {path : '**', component: NotFoundComponent}
      
      

    ])
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
