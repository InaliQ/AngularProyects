import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/pages/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import ( './myspa-products/products.module' ).then( m => m.ProductsModule ),
  },
  {
    path: '',
    loadChildren: () => import ( './myspa-administrative/administrative.module' ).then( m => m.AdministrativeModule),

  },
  {
    path: '',
    loadChildren: () => import ( './auth/auth.module' ).then( m => m.AuthModule)
  },
  {
    path:'',
    loadChildren: () => import ('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
