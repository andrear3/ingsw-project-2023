import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    MatFormFieldModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './registrationpage.component.html',
  styleUrls: ['./registrationpage.component.scss'],
})
export class RegistrationpageComponent {
  options: string[] = ['venditore', 'compratore'];

  restService = inject(RestService);
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nickname: ['', Validators.required],
      tipoAccount: ['', Validators.required], // This should map to ENUM values
      regione: ['', Validators.required],
      indirizzo: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValues = this.registrationForm.value;
      const newUser: Utente = {
        email: formValues.email,
        nome: formValues.nome,
        cognome: formValues.cognome,
        // Removed dataNascita as it's not in your model
        password: formValues.password,
        nickname: formValues.nickname,
        tipo:
          formValues.tipoAccount === 'Venditore'
            ? tipoEnum.venditore
            : tipoEnum.compratore, // Ensure this matches ENUM values
        regione: formValues.regione,
        indirizzo: formValues.indirizzo,
        linkEsterni: '', // Default value for linkEsterni
      };

      console.log(newUser);
      this.restService.registraUtente(newUser).subscribe(
        (response) => {
          console.log('Registration successful:', response);
        },
        (error) => {
          console.error('Error during registration:', error);
        }
      );
    }
  }
}
