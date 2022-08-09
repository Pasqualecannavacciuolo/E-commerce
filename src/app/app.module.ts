import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderByPipe } from './order-by.pipe';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CartComponent } from './cart/cart.component';
import { SumPipe } from './sum.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { CreateCourseComponent } from './admin/create-course/create-course.component';
import { SuccessComponent } from './success/success.component';
import { HomeDashboardComponent } from './admin/home-dashboard/home-dashboard.component';
import { SuccessSubscriptionComponent } from './success-subscription/success-subscription.component';



@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    RegisterComponent,
    LoginComponent,
    HeroComponent,
    HomeComponent,
    ProfileComponent,
    OrderByPipe,
    CourseDetailComponent,
    CartComponent,
    SumPipe,
    DashboardComponent,
    CreateAdminComponent,
    CreateCourseComponent,
    SuccessComponent,
    HomeDashboardComponent,
    SuccessSubscriptionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxChartsModule,
  ],
  providers: [OrderByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
