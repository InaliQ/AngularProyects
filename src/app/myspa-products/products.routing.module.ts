import { RouterModule, Routes } from '@angular/router';
import {  NgModule } from '@angular/core';

import { ProductsComponent } from './pages/products/products.component'
import { ServiceProductsComponent } from './pages/services/service.component'
import { ServiceReservationsComponent } from './pages/reservations/reservations.component';
import { LayoutProductsComponent } from './pages/layout/layout.component';


const routes : Routes = [
  {
  path:'',
  component: LayoutProductsComponent,
  children:[
    {path: 'products/products', component:ProductsComponent},
    {path: 'products/service', component: ServiceProductsComponent},
    {path: 'products/reservations', component: ServiceReservationsComponent},
  ]
  }];




@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class ProductsRoutingModule { }
