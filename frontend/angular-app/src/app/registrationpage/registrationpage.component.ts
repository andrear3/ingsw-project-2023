import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestService } from '../_services/rest-api.service';
import { Utente } from '../_models/utente-model'; // Ensure this path is correct
import { tipoEnum } from '../_models/tipoEnum'; // Ensure this is correctly imported

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
    FormsModule, RouterLink
  ],
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.scss'],
})
export class RegistrationpageComponent {
  options: string[] = ['venditore', 'compratore'];
  email: string= '';
  nome: string= '';
  cognome: string= '';
  password: string= '';
  nickname: string= '';
  tipo: string='';
  regione: string= '';
  indirizzo: string= '';




  restService = inject(RestService);

}

