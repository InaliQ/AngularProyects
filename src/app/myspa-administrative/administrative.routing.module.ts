import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminsitrativeRequesComponent } from './pages/request/reques.component';
import { AdministrativeCustomersComponent } from './pages/customers/customers.component';
import { AdministrativeEmployeesComponent } from './pages/employees/employess.component';
import { LayoutAdminComponent } from './pages/layout/layout.component';

const routes: Routes = [
{
path:'',
component: LayoutAdminComponent,
children:[
  {path: 'administrative/customers', component: AdministrativeCustomersComponent},
  {path: 'administrative/employees', component: AdministrativeEmployeesComponent},
  {path: 'administrative/request', component:AdminsitrativeRequesComponent},

]

}
];





@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule]
})
export class AdminsitrativeRoutingModule { }
