import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { Error401Component } from './pages/error401/error401.component';
import { Error404Component } from './pages/error404/error404.component';




@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    Error401Component,
    Error404Component
  ],
  declarations: [
    Error401Component,
    Error404Component,
  ],
  providers: [],
})
export class SharedModule { }
