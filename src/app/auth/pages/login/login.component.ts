import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-auth',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogin(): void{
     this.authService.login('Inali','InaliQ01')
     .subscribe( user => {
      this.router.navigate(['/'])
     })
  }
}
