import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RelevanceComponent } from './relevance/relevance.component';
import { RelevanceDataComponent } from './relevance-data/relevance-data.component';
import { CoursesComponent } from './courses/courses.component';
import { TrainerComponent } from './trainer/trainer.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { SeeallcategoriesComponent } from './seeallcategories/seeallcategories.component';
import { SeealltrainerComponent } from './seealltrainer/seealltrainer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminDashboardCategoriesComponent } from './admin/admin-dashboard-categories/admin-dashboard-categories.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { InstructorComponent } from './admin/instructor/instructor.component';
import { EnrollNowComponent } from './enroll-now/enroll-now.component';
import { CourseenrollComponent } from './courseenroll/courseenroll.component';
import { TrainerHomeComponent } from './trainer_dashboard/trainer-home/trainer-home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
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
import { UpdateCourseComponent } from './admin/update-course/update-course.component';

const routes: Routes = [

  // Routing For Admin Dashboard
  { path:"admin",component:AdminDashboardComponent,

    children:[
      { path:"",component:AdminHomeComponent},
      { path:"adminhome",component:AdminHomeComponent},
      { path:"admincategory",component:AdminDashboardCategoriesComponent},
      { path:"admincourse",component:AdminCoursesComponent},
      { path:"instructors",component:InstructorComponent},
      
    ]
    
   },
   {path:"editcategory/:_id",component:EditCategoryComponent},
   {path:"updatecourse/:_id",component:UpdateCourseComponent},

   //  Routing For Trainer Dashboard
      {path:"trainer",component:TrainerHomeComponent,

        children:[
          {path:"",component:MyCourseComponent},
          {path:"mycourse",component:MyCourseComponent},
          {path:"product",component:ProductComponent},
          {path:"question",component:QuestionComponent},
          {path:"appointment",component:AppointmentComponent},
          {path:"event",component:EventComponent},
          {path:"enquiry",component:EnquiryComponent}
        ]

      },
      {path:"edittrainer",component:EdittrainerComponent},
      {path:"editcourse/:_id",component:EditCourseComponent},
      {path:"editproduct/:_id",component:UpdateProductComponent},
      {path:"editevent/:_id",component:UpdateEventComponent},

  //  Routing For User Dashboard

  {path:"", component:DashboardComponent},
  {path:"signin", component:SignInComponent},
  {path:"signup",component:SignUpComponent},
  {path:"forgotfassword",component:ForgotPasswordComponent},
  {path:"seeallcategories",component:SeeallcategoriesComponent},
  {path:"courcedetails", component:CourseDetailsComponent},
  {path:"shop",component:ShopComponent},
  {path:"gallery",component:GalleryComponent},
  {path:"relevance",component:RelevanceComponent,
    children:[
      {path:"",component:RelevanceDataComponent},
      {path:"relevancedata",component:RelevanceDataComponent},
      {path:"courses",component:CoursesComponent},
      {path:"trainer",component:TrainerComponent},
    ]
  },
  {path:"couserenroll",component:CourseenrollComponent},
  {path:"enrollNow",component:EnrollNowComponent}
   
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
