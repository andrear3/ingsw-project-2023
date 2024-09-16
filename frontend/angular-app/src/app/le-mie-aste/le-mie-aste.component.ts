import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestService } from '../_services/rest-api.service';

import { Asta } from '../_models/asta-model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import { Subscription } from 'rxjs';

import { statusAstaEnum } from '../_models/asta-model';
import { tipoBeneVenditaEnum } from '../_models/asta-model';
import { categoriaEnum } from '../_models/asta-model';


@Component({
  selector: 'app-le-mie-aste',
  standalone: true,
  imports: [ NavbarComponent,
    MatToolbarModule,
   MatIconModule,
   MatAutocompleteModule,
   MatInputModule,
   RouterOutlet,
   CommonModule,
   FormsModule,
   RouterLink,],
  templateUrl: './le-mie-aste.component.html',
  styleUrl: './le-mie-aste.component.scss',
})
export class LeMieAsteComponent {

}