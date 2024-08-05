import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestService } from '../_services/rest-api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss']
})
//login
export class LogInPageComponent {
  email: string = '';
  password: string = '';

  constructor(private restApiService: RestService) {}

  login() {
    this.restApiService.login(this.email, this.password).subscribe(response => {
      console.log('Login successful:', response);
    }, error => {
      console.error('Login failed:', error);
    });
  }
}