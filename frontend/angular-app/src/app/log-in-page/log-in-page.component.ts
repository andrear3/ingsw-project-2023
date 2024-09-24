import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestService } from '../_services/rest-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {
 
  RouteConfigLoadEnd,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,
    RouterModule,NavbarComponent],
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss'],
})
export class LogInPageComponent {
  email: string = '';
  password: string = '';

  constructor(
    private restApiService: RestService,
    private authService: AuthService,
    private router: Router 
  ) {}

  login() {
    this.restApiService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response?.accessToken);
        this.authService.setToken(response?.accessToken);

        
        this.router.navigate(['/homepage']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
