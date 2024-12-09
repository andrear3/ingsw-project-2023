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
import { Asta, statusAstaEnum } from '../_models/asta-model';

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
  private intervalId: any;
  salesValue: number = 0;
  numberSold: number = 0;

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

          this.startDecrementTimer();
          this.stats();
          console.log(this.dashboardData[0].nomeBeneInVendita);
        },
        error: (err) => {
          console.error('Error posting to dashboard:', err);
        },
      });
    }
  }

  startDecrementTimer() {
    this.intervalId = setInterval(() => this.decrement(), 1000);
  }

  decrement() {
    this.dashboardData = this.dashboardData.map((data) => ({
      ...data,
      timeLeft: Math.max(data.timeLeft - 1, 0),
    }));
  }

  getFormattedTime(data: Asta): string {
    return this.secondsToDhms(data.timeLeft);
  }

  secondsToDhms(seconds: number): string {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? `${d}d ` : '';
    const hDisplay = h > 0 ? `${h}h ` : '';
    const mDisplay = m > 0 ? `${m}m ` : '';
    const sDisplay = s > 0 ? `${s}s` : '';

    return dDisplay + hDisplay + mDisplay + sDisplay.trim();
  }

  stats() {
    for (const data of this.dashboardData) {
      console.log(data.statusAsta);
      if (String(data.statusAsta) === 'venduto') {
        this.salesValue += data.offertaMax;
        this.numberSold += 1;
      }
    }
  }
}
