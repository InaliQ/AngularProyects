


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Products } from '../interfaces/products.interface';

@Injectable({providedIn: 'root'})
export class ProductsService {

  private baseUrl: string = environments.baseUrl;
  constructor(private https: HttpClient) { }


  getProducts(): Observable<Products[]>{
    return this.https.get<Products[]>(`${this.baseUrl}/products`)
  }
}
