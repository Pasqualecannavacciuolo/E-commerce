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
import { CartComponent } from './cart/cart.component';
import { AdminGuard } from './admin.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { CreateCourseComponent } from './admin/create-course/create-course.component';
import { SuccessComponent } from './success/success.component';
import { HomeDashboardComponent } from './admin/home-dashboard/home-dashboard.component';
import { SuccessSubscriptionComponent } from './success-subscription/success-subscription.component';

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
    path: 'success',
    component: SuccessComponent,
    canActivate: [LoggedUsersGuard] 
  },
  {
    path: 'success-subscription',
    component: SuccessSubscriptionComponent,
    canActivate: [LoggedUsersGuard] 
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [LoggedUsersGuard] 
  },
  { 
    path: 'cart', 
    component: CartComponent,
    canActivate: [LoggedUsersGuard] 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { 
        path: '', 
        component: HomeDashboardComponent,
        canActivate: [AdminGuard],
        outlet: 'admin_outlet' 
      },
      { 
        path: 'create-admin', 
        component: CreateAdminComponent,
        canActivate: [AdminGuard],
        outlet: 'admin_outlet' 
      },
      { 
        path: 'create-course', 
        component: CreateCourseComponent,
        canActivate: [AdminGuard],
        outlet: 'admin_outlet' 
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
