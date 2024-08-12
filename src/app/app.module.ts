  import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { RelevanceComponent } from './relevance/relevance.component';
import { CoursesComponent } from './courses/courses.component';
import { TrainerComponent } from './trainer/trainer.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RelevanceDataComponent } from './relevance-data/relevance-data.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeeallcategoriesComponent } from './seeallcategories/seeallcategories.component';
import { SeealltrainerComponent } from './seealltrainer/seealltrainer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminDashboardCategoriesComponent } from './admin/admin-dashboard-categories/admin-dashboard-categories.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { InstructorComponent } from './admin/instructor/instructor.component';
import { TrainerHomeComponent } from './trainer_dashboard/trainer-home/trainer-home.component';
import { CourseenrollComponent } from './courseenroll/courseenroll.component';
import { EnrollNowComponent } from './enroll-now/enroll-now.component';
import { EdittrainerComponent } from './edittrainer/edittrainer.component';
import { MyCourseComponent } from './trainer_dashboard/my-course/my-course.component';
import { QuestionComponent } from './trainer_dashboard/question/question.component';
import { AppointmentComponent } from './trainer_dashboard/appointment/appointment.component';
import { EventComponent } from './trainer_dashboard/event/event.component';
import { EnquiryComponent } from './trainer_dashboard/enquiry/enquiry.component';
import { ProductComponent } from './trainer_dashboard/product/product.component';
import { EditCourseComponent } from './trainer_dashboard/edit-course/edit-course.component';
import { EditCategoryComponent } from './Admin/edit-category/edit-category.component';
import { UpdateProductComponent } from './trainer_dashboard/update-product/update-product.component';
import { UpdateEventComponent } from './trainer_dashboard/update-event/update-event.component';
import { UpdateCourseComponent } from './admin/update-course/update-course.component'; // Import FormsModule



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    RelevanceComponent,
    CoursesComponent,
    TrainerComponent,
    ShopComponent,
    CartComponent,
    SignInComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    CourseDetailsComponent,
    RelevanceDataComponent,
    SeeallcategoriesComponent,
    SeealltrainerComponent,
    GalleryComponent,
    AdminDashboardComponent,
    AdminDashboardCategoriesComponent,
    AdminHomeComponent,
    AdminCoursesComponent,
    InstructorComponent,
    TrainerHomeComponent,
    CourseenrollComponent,
    EnrollNowComponent,
    EdittrainerComponent,
    MyCourseComponent,
    QuestionComponent,
    AppointmentComponent,
    EventComponent,
    EnquiryComponent,
    ProductComponent,
    EditCourseComponent,
    EditCategoryComponent,
    UpdateProductComponent,
    UpdateEventComponent,
    UpdateCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
