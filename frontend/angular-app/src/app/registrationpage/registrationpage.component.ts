import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';

//carico gli import di sopra per aggiungerli alla pagina in inports[ ]
@Component({
  selector: 'app-registrationpage',
  standalone: true,
  imports: [MatToolbarModule,
    MatIcon,
    MatAutocompleteModule,
    MatInputModule,
    MatFormField,
    RouterOutlet,],
  templateUrl: './registrationpage.component.html',
  styleUrl: './registrationpage.component.scss'
})
//inserimento delle categorie per il tipo account 
export class RegistrationpageComponent {
  options: string[] = [
    'Compratore',
    'Venditore',
  ];
}
