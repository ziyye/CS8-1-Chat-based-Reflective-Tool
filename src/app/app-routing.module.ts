import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
 import { LoginComponent } from './auth/login/login.component';
 import { RegisterComponent } from './auth/register/register.component';
 import { ResetpasswordComponent }from './auth/resetpassword/resetpassword.component';

const routes: Routes = [

  {path: 'student', component : StudentComponent},
  {path: 'teacher', component : TeacherComponent},
  {path: 'login', component : LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'resetpassword',component:ResetpasswordComponent},
  {path: '**', redirectTo:'/login',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
