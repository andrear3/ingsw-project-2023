import { Component, inject, OnInit } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { RouterLink } from '@angular/router';
//import { Login } from '../_models/login-model';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.scss',
})
export class LogInPageComponent {
 
}
