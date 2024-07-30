import { Component, inject, OnInit } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { RouterLink } from '@angular/router';
import { Login } from '../_models/login-model';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.scss',
})
export class LogInPageComponent {
  restService = inject(RestService);
  login: Login = {
    nickname: "giorgio",
    password: "giorgio",
  };

  ngOnInit() {
    this.restService.loginUtente(this.login).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
