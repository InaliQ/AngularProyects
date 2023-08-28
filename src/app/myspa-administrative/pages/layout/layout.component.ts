import { Component } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { Customers } from '../../interfaces/custumers.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutAdminComponent {
constructor(
  private authService: AuthService,
  private router: Router
){}

  onLogOut(){
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

  public sidebarItems = [
    {label: 'Clientes', icon:'label', url:'./administrative/customers'},
    {label: 'Empleados', icon:'label', url:'./administrative/employees'},
    {label: 'Solicitudes', icon:'label', url:'./administrative/request'},
    {label: 'Servicios', icon: 'label', url:'./products/service' },
    {label: 'Productos', icon: 'label', url: './products/products'},
    {label: 'Reservar', icon: 'label', url: './products/reservations'}
  ]
}
