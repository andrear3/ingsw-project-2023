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
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-le-mie-aste',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './le-mie-aste.component.html',
  styleUrls: ['./le-mie-aste.component.scss'],
})
export class LeMieAsteComponent implements OnInit, OnDestroy {
  aste: Asta[] = [];
  asteFiltrate: Asta[] = [];
  astePartecipate: Asta[] = [];
  utente: Utente | null = null;
  tipoAsta: string = 'Classica';
  categoriaFiltro: string | null = null;
  utenteFiltro: string | null = null;
  searchQuery: string = '';
  private subscriptions: Subscription = new Subscription();
  private intervalId: any;

  options: string[] = [
    'informatica',
    'videogames',
    'musica',
    'sport',
    'collezionismo',
  ];
  optionAsta: string[] = ['Classica', 'Inversa', 'Al Ribasso'];
  optionUtente: string[] = ['Create da me', 'Partecipando'];

  constructor(
    private restService: RestService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.restService.getAsta().subscribe({
        next: (response: { aste: Asta[]; userInfo: Utente }) => {
          this.aste = response.aste;
          this.asteFiltrate = [...this.aste];
          this.utente = response.userInfo;
          this.authService.setUtente(this.utente);
          this.authService.setStatus(true);

          if (this.utente) {
            this.subscriptions.add(
              this.restService.offerteByUtente().subscribe({
                next: (astePartecipate) => {
                  this.astePartecipate = astePartecipate;
                  console.log('Aste partecipate:', astePartecipate);
                },
                error: (err) =>
                  console.error('Errore nel recuperare le aste:', err),
              })
            );
          }

          this.startDecrementTimer();
        },
        error: (err) =>
          console.error('Errore nel caricamento delle aste:', err),
      })
    );
  }

  applyFilters() {
    if (this.utenteFiltro === 'Partecipando') {
      this.asteFiltrate = this.astePartecipate.filter((asta) => {
        if (
          this.searchQuery &&
          !asta.nomeBeneInVendita.toLowerCase().includes(this.searchQuery)
        ) {
          return false;
        }
        if (
          this.categoriaFiltro &&
          String(asta.categoria) !== this.categoriaFiltro
        ) {
          return false;
        }
        return true;
      });
    } else {
      this.asteFiltrate = this.aste.filter((asta) => {
        if (
          this.searchQuery &&
          !asta.nomeBeneInVendita.toLowerCase().includes(this.searchQuery)
        ) {
          return false;
        }
        if (
          this.categoriaFiltro &&
          String(asta.categoria) !== this.categoriaFiltro
        ) {
          return false;
        }
        if (
          this.utenteFiltro === 'Create da me' &&
          asta.UtenteNickname !== this.utente?.nickname
        ) {
          return false;
        }
        return true;
      });
    }
  }

  filtraUtente(event: MatAutocompleteSelectedEvent) {
    this.utenteFiltro = event.option.value;
    this.applyFilters();
  }

  filterResults(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement?.value?.toLowerCase() || '';
    this.applyFilters();
  }

  filterResultsCategoria(event: MatAutocompleteSelectedEvent) {
    this.categoriaFiltro = event.option.value;
    this.applyFilters();
  }

  filterResultsTipoAsta(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;

    if (selectedValue === 'Al Ribasso') {
      this.tipoAsta = 'Al Ribasso';
      this.fetchAste(() => this.restService.getAstaRibasso());
    } else if (selectedValue === 'Inversa') {
      this.tipoAsta = 'Inversa';
      this.fetchAste(() => this.restService.getAstaInversa());
    } else {
      this.tipoAsta = 'Classica';
      this.fetchAste(() => this.restService.getAsta());
    }
  }

  fetchAste(apiCall: () => any) {
    this.subscriptions.add(
      apiCall().subscribe({
        next: (response: { aste: Asta[]; userInfo: Utente }) => {
          this.aste = response.aste;
          this.applyFilters();
        },
        error: () => console.error('Errore nel caricamento delle aste:'),
      })
    );
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

    return `${d > 0 ? d + 'd ' : ''}${h > 0 ? h + 'h ' : ''}${
      m > 0 ? m + 'm ' : ''
    }${s > 0 ? s + 's' : ''}`;
  }

  navigateToviewAsta(asta: Asta, tipoAsta: string) {
    this.authService.setAsta(asta);
    this.authService.setTipo(tipoAsta);
    this.router.navigate(['/auctionView']);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.subscriptions.unsubscribe();
  }
}
