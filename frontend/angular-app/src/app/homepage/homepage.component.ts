import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { Asta } from '../_models/asta-model';
import { Utente } from '../_models/utente-model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  aste: Asta[] = [];
  utente: Utente | null = null;
  private intervalId: any;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private restService: RestService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.authService.getToken());
    this.subscriptions.add(
      this.restService.getAsta().subscribe({
        next: (response: { aste: Asta[]; userInfo: Utente }) => {
          this.aste = response.aste;
          this.utente = response.userInfo;

          this.startDecrementTimer();
          console.log(this.aste[0]?.statusAsta);
          console.log(this.utente?.tipo);

          //popolo i campi di utente
          this.authService.setUtente(this.utente);
          //notifico che utente è stato popolato
          this.authService.setStatus(true);
        },
        error: (err: any) => {
          console.error('Error fetching data:', err);
        },
      })
    );
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.subscriptions.unsubscribe();
  }

  startDecrementTimer() {
    this.intervalId = setInterval(() => this.decrement(), 1000);
  }

  decrement() {
    this.aste = this.aste.map((asta) => ({
      ...asta,
      timeLeft: Math.max(asta.timeLeft - 1, 0),
    }));
  }

  getFormattedTime(asta: Asta): string {
    return this.secondsToDhms(asta.timeLeft);
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
}
