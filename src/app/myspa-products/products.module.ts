import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceReservationsComponent } from './pages/reservations/reservations.component';
import { ProductsComponent } from './pages/products/products.component'
import { ServiceProductsComponent } from './pages/services/service.component'
import { ProductsRoutingModule } from './products.routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutProductsComponent } from './pages/layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule

  ],
  exports: [],
  declarations: [
    ProductsComponent,
    ServiceProductsComponent,
    ServiceReservationsComponent,
    LayoutProductsComponent

  ],
  providers: [],
})


export class ProductsModule { }
