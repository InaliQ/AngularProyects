import { NgModule } from '@angular/core';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';


const routes : Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild( routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
