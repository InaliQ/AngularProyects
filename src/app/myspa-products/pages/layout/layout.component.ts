import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutProductsComponent {

  public sidebarItems = [
    {label: 'Clientes', icon:'label', url:'./administrative/customers'},
    {label: 'Empleados', icon:'label', url:'./administrative/employees'},
    {label: 'Solicitudes', icon:'label', url:'./administrative/request'},
    {label: 'Servicios', icon: 'label', url:'./products/service' },
    {label: 'Productos', icon: 'label', url: './products/products'},
    {label: 'Reservar', icon: 'label', url: './products/reservations'}
  ]
}
