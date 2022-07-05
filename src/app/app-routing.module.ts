import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { LoggedUsersGuard } from './logged-users.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

const routes: Routes = [
  { 
    path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'courses', 
    component: CoursesComponent,
    canActivate: [LoggedUsersGuard] 
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
    canActivate: [LoggedUsersGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [LoggedUsersGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
