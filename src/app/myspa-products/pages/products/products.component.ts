import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['products.component.css']
})
export class ProductsComponent implements OnInit {

public products: Products[] = [];


constructor(private productsService: ProductsService){}



  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe(products => this.products = products)
    throw new Error('No hay productos diponibles.');
  }

}
