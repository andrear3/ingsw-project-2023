import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { Asta } from '../_models/asta-model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData: Asta[] = [];
  dashboardData: Asta[] = [];
  private intervalId: any;

  constructor(
    private restService: RestService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.callPostDashboard();
  }

  callPostDashboard() {
    let user = this.authService.getUtente();
    if (user) {
      this.restService.postDashboard(user.nickname).subscribe({
        next: (response) => {
          console.log('Dashboard updated:', response);
          this.dashboardData = response.data; //conserva i dati della risposta

          console.log(this.dashboardData[0].nomeBeneInVendita);
        },
        error: (err) => {
          console.error('Error posting to dashboard:', err);
        },
      });
    }
  }
}
