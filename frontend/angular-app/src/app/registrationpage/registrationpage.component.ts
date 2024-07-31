import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestService } from '../_services/rest-api.service';

import { Utente } from '../_models/utente-model';
import { tipoEnum } from '../_models/tipoEnum';

@Component({
  selector: 'app-registrationpage',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.scss']
})
export class RegistrationpageComponent {
  options: string[] = [
    'Compratore',
    'Venditore',
  ];

  restService = inject(RestService);
  registrationForm: FormGroup;
  utente: Utente[] = [];

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nickname: ['', Validators.required],
      tipoAccount: ['', Validators.required],
      regione: ['', Validators.required],
      indirizzo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;
      const newUser: Utente = {
        nickname: formValues.nickname,
        password: formValues.password,
        nome: formValues.nome,
        cognome: formValues.cognome,
        tipo: formValues.tipoAccount === 'Venditore' ? tipoEnum.venditore : tipoEnum.compratore,
        regione: formValues.regione,
        linkEsterni: '', // Adjust this if you have an input for linkEsterni
        indirizzo: formValues.indirizzo,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.utente.push(newUser);
      console.log(this.utente);
    }
  }
}
