import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestService } from '../_services/rest-api.service';
import { Utente } from '../_models/utente-model';
import { TipoUtente } from '../_models/tipo-utente-enum';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrationpage',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.scss'],
})
export class RegistrationpageComponent {
  options: string[] = ['venditore', 'compratore'];

  utente: Utente = {
    email: '',
    descrizione: '',
    nickname: '',
    password: '',
    nome: '',
    cognome: '',
    tipo: TipoUtente.compratore,
    regione: '',
    link1: '',
    link2: '',
    link3: '',
    indirizzo: '',
    saldo: 0,
    url: '',
  };

  constructor(
    private restApiService: RestService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  register() {
    this.restApiService.register(this.utente).subscribe({
      next: () => {
        this.snackBar.open('Sei stato registrato con successo! ✅', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('Errore nella registrazione', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
