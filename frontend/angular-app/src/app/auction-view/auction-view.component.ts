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
import { Utente } from '../_models/utente-model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { state } from '@angular/animations';
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
    RouterLink,
  ],
  templateUrl: './auction-view.component.html',
  styleUrls: ['./auction-view.component.scss'],
})
export class AuctionViewComponent {
  asta: any = {};
  private intervalId: any;
  newOfferta: number | null = null;

  constructor(
    private restService: RestService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  public tipoAsta: string = '';
  utenteAsta: Utente | null = null;
  nickname: string | null = null;
  errorMessage: string | null = null;

  ngOnInit() {
    this.tipoAsta = this.authService.getTipo();
    this.asta = this.authService.getAsta();
    console.log('astaselezioianta', this.asta);
    console.log('nick da passare ', this.asta.UtenteNickname);
    this.startDecrementTimer();

    this.nickname = this.asta.UtenteNickname;
    console.log('il nickname', this.nickname);
    if (this.nickname) {
      this.restService.getUtenteByNickname(this.nickname).subscribe({
        next: (data) => {
          this.utenteAsta = data;
          console.log('Utente trovato:', this.utenteAsta);
        },
        error: (err) => {
          console.error("Errore nel recupero dell'utente:", err);
          this.errorMessage =
            "Errore nel recupero delle informazioni dell'utente";
        },
      });
    }
  }

  makeOffer() {
    if (this.newOfferta !== null) {
      const offerData = {
        valore: this.newOfferta,
        UtenteNickname: this.authService.getUtente()?.nickname,
        AstumAstaID: this.asta.astaID,
      };

      console.log(offerData);

      this.restService
        .postOffer(
          offerData.valore,
          String(offerData.UtenteNickname),
          offerData.AstumAstaID
        )
        .subscribe({
          next: () =>
            this.snackBar.open('Offerta proposta con successo! ✅', 'Close', {
              duration: 3000,
            }),
          error: () =>
            this.snackBar.open(
              'Errore durante la proposta di offerta!',
              'Close',
              {
                duration: 3000,
              }
            ),
        });
      this.router.navigate(['/homepage']);
    } else {
      console.log(this.newOfferta);
      console.log('Offerta non valida');
    }
  }

  makeOfferInversa() {
    if (this.newOfferta !== null) {
      const offerData = {
        valore: this.newOfferta,
        UtenteNickname: this.authService.getUtente()?.nickname,
        AstumAstaID: this.asta.astaID,
      };

      console.log(offerData);

      this.restService
        .postOfferInversa(
          offerData.valore,
          String(offerData.UtenteNickname),
          offerData.AstumAstaID
        )
        .subscribe({
          next: () =>
            this.snackBar.open('Offerta proposta con successo! ✅', 'Close', {
              duration: 3000,
            }),
          error: () =>
            this.snackBar.open(
              'Errore durante la proposta di offerta!',
              'Close',
              {
                duration: 3000,
              }
            ),
        });
      this.router.navigate(['/homepage']);
    } else {
      console.log(this.newOfferta);
      console.log('Offerta non valida');
    }
  }
  //da usare
  makeOfferRibasso() {
    const offerData = {
      UtenteNickname: this.authService.getUtente()?.nickname,
      AstumAstaID: this.asta.astaID,
    };

    console.log(offerData);

    this.restService
      .postOfferRibasso(String(offerData.UtenteNickname), offerData.AstumAstaID)
      .subscribe({
        next: () =>
          this.snackBar.open('Asta aggiudicata! ✅', 'Close', {
            duration: 3000,
          }),
        error: () =>
          this.snackBar.open(
            'Errore durante la proposta di offerta!',
            'Close',
            {
              duration: 3000,
            }
          ),
      });
    this.router.navigate(['/homepage']);
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
  visualProfile() {
    this.router.navigate(['/visualizzaProfilo', this.asta.UtenteNickname]);
    console.log('utenten passato ', this.asta.UtenteNickname);
  }
}
