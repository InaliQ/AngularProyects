import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsitrativeRequesComponent } from './pages/request/reques.component';
import { AdministrativeCustomersComponent } from './pages/customers/customers.component';
import { AdministrativeEmployeesComponent } from './pages/employees/employess.component';
import { LayoutAdminComponent } from './pages/layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { AdminsitrativeRoutingModule } from './administrative.routing.module';


@NgModule({
  imports: [
    CommonModule,
    AdminsitrativeRoutingModule,
    MaterialModule,

  ],
  exports: [],

  declarations: [
    AdminsitrativeRequesComponent,
    AdministrativeEmployeesComponent,
    AdministrativeCustomersComponent,
    LayoutAdminComponent,
  ],
  providers: [],
})
export class AdministrativeModule { }
