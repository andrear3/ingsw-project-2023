import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auction-view',
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
  templateUrl: './auction-view.component.html',
  styleUrls: ['./auction-view.component.scss'],
})
export class AuctionViewComponent implements OnInit {
  // Use `any` type for `asta` to avoid TypeScript type-checking issues
  asta: any = {};
  private intervalId: any;
  newOfferta: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.asta.astaId = +params['astaID'];
      this.asta.nomeBeneInVendita = params['nomeBeneInVendita'];
      this.asta.titolo = params['titolo'];
      this.asta.categoria = params['categoria'];
      this.asta.tipoBeneInVendita = params['tipoBeneInVendita'];
      this.asta.descrizioneAsta = params['descrizioneAsta'];
      this.asta.dataFineAsta = new Date(params['dataFineAsta']);
      this.asta.statusAsta = params['statusAsta'];
      this.asta.url = decodeURIComponent(params['url']);
      this.asta.UtenteNickname = params['UtenteNickname'];
      this.asta.offertaMax = +params['offertaMax'];
      this.asta.timeLeft = +params['timeLeft'];

      console.log('Asta data from URL:', this.asta);
      this.startDecrementTimer();
    });
  }

  makeOffer() {
    if (this.newOfferta !== null) {
      const offerData = {
        valore: this.newOfferta,
        UtenteNickname: this.authService.getUtente()?.nickname,
        AstumAstaID: this.asta.astaId,
      };

      this.restService
        .postOffer(
          offerData.valore,
          String(offerData.UtenteNickname),
          offerData.AstumAstaID
        )
        .subscribe({
          next: (response) => {
            console.log('Offerta:', response);
          },
          error: (err) => {
            console.error('Errore:', err);
          },
        });
    } else {
      console.log(this.newOfferta);
      console.log('Offerta non valida');
    }
  }

  startDecrementTimer() {
    this.intervalId = setInterval(() => this.decrement(), 1000);
  }

  decrement() {
    this.asta.timeLeft = Math.max(this.asta.timeLeft - 1, 0);
  }

  getFormattedTime(): string {
    return this.secondsToDhms(this.asta.timeLeft);
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
