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
import { Router } from '@angular/router';
import { Offerta } from '../_models/offerta-model';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';


@Component({
  selector: 'app-le-mie-aste',
  standalone: true,
  imports: [ NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,],
  templateUrl: './le-mie-aste.component.html',
  styleUrl: './le-mie-aste.component.scss'
})
export class LeMieAsteComponent {
  aste: Asta[] = [];
  offerta: Offerta[] = [];
  utente: Utente | null = null;
  private intervalId: any;
  private subscriptions: Subscription = new Subscription();
  options: string[] = [
    'informatica',
    'videogames',
    'musica',
    'sport',
    'collezionismo',
  ];
  optionAsta: string[] = ['Classica', 'Inversa', 'Al Ribasso'];
  asteFiltrate: Asta[] = [];
  tipoAsta: string = 'Classica';
  optionUtente :string[]=['Create da me', 'Partecipando']

  constructor(
    private restService: RestService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.authService.getToken());
    this.subscriptions.add(
      this.restService.getAsta().subscribe({
        next: (response: { aste: Asta[]; userInfo: Utente }) => {
          this.aste = response.aste;
          this.asteFiltrate = [...this.aste];
          this.utente = response.userInfo;
          this.authService.setUtente(this.utente);
          this.authService.setStatus(true);
          console.log('utentne',this.utente.nickname);
          if (this.utente) {
            this.subscriptions.add(
              this.restService.getOfferteByUtente(this.utente.nickname).subscribe({
                next: (offerta) => {
                  this.offerta = offerta;
                },
                error: (err) => console.error('Errore nel recuperare le offerte:', err),
              })
            );
          }
          this.startDecrementTimer();
        },
        error: (err: any) => {
          console.error('Error fetching data:', err);
        },
      })
    );
  }
  filtraUtente(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    if (selectedValue === 'Create da me') {
      this.asteFiltrate = this.aste.filter(
        (asta) => asta.UtenteNickname === this.utente?.nickname
      );
    } else if (selectedValue === 'Partecipando' && this.offerta.length > 0) {
      const astePartecipateIds = this.offerta.map(offerta => offerta.AstumAstaID);
      this.asteFiltrate = this.aste.filter(asta => astePartecipateIds.includes(asta.astaId));
    }
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
    let activeAuctions = false;

    this.asteFiltrate = this.asteFiltrate.map((data) => {
      if (data.timeLeft > 0) {
        activeAuctions = true;
        return { ...data, timeLeft: Math.max(data.timeLeft - 1, 0) };
      }
      return data;
    });

    if (!activeAuctions && this.intervalId) {
      clearInterval(this.intervalId);
    }
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

 
  navigateToviewAsta(asta: Asta, tipoAsta:string) {
    this.authService.setAsta(asta);
    this.authService.setTipo(this.tipoAsta);
    console.log(asta);
    this.router.navigate(['/auctionView']);
  }
  filterResults(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement?.value?.toLowerCase() || '';

    if (!searchText) {
      this.asteFiltrate = [...this.aste];
      return;
    }

    this.asteFiltrate = this.aste.filter((asta) =>
      asta?.nomeBeneInVendita?.toLowerCase().includes(searchText)
    );
  }
  filterResultsCategoria(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value; 
    this.asteFiltrate = this.aste.filter(
      (asta) => asta.categoria === selectedValue
    );
    console.log('Selected option:', selectedValue); 
    console.log('Filtered Aste:', this.asteFiltrate); 
  }
  filterResultsTipoAsta(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    console.log('Selected option:', selectedValue);

    if (selectedValue == 'Al Ribasso') {
      this.tipoAsta = 'Al Ribasso';
      this.subscriptions.add(
        this.restService.getAstaRibasso().subscribe({
          next: (response: { aste: Asta[]; userInfo: Utente }) => {
            this.aste = response.aste;
            this.asteFiltrate = [...this.aste];

          },
          error: (err: any) => {
            console.error('Error fetching data:', err);
          },
        })
      );
    }

    if (selectedValue == 'Inversa') {
      this.tipoAsta = 'Inversa';
      this.subscriptions.add(
        this.restService.getAstaInversa().subscribe({
          next: (response: { aste: Asta[]; userInfo: Utente }) => {
            this.aste = response.aste;
            this.asteFiltrate = [...this.aste];

          },
          error: (err: any) => {
            console.error('Error fetching data:', err);
          },
        })
      );
    }


    if (selectedValue == 'Classica') {
      this.tipoAsta = 'Classica';
      this.subscriptions.add(
        this.restService.getAsta().subscribe({
          next: (response: { aste: Asta[]; userInfo: Utente }) => {
            this.aste = response.aste;
            this.asteFiltrate = [...this.aste];

          },
          error: (err: any) => {
            console.error('Error fetching data:', err);
          },
        })
      );
    }
  }
}