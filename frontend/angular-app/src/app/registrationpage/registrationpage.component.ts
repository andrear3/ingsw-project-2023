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
  email: string = '';
  nome: string = '';
  cognome: string = '';
  password: string = '';
  nickname: string = '';
  tipo: string = '';
  regione: string = '';
  indirizzo: string = '';

  utente: Utente = {
    email: this.email,
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
    url: ''
  };

  constructor(private restApiService: RestService) {}

  register() {
    this.restApiService
      .register(
        this.email,
        this.nome,
        this.cognome,
        this.password,
        this.nickname,
        this.tipo,
        this.regione,
        this.indirizzo
      )
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
  }


}
