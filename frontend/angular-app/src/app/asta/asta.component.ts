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
@Component({
  selector: 'app-asta',
  standalone: true,
  imports: [NavbarComponent,
    MatToolbarModule,
   MatIconModule,
   MatAutocompleteModule,
   MatInputModule,
   RouterOutlet,
   CommonModule,
   FormsModule,
   RouterLink,],
  templateUrl: './asta.component.html',
  styleUrl: './asta.component.scss'
})
export class AstaComponent {
tipoAsta: string='classica'

  astaClassica(){
    this.tipoAsta='classica';
  }
  astaAlRibasso(){
    this.tipoAsta='ribasso'
  }
  astaInversa(){
    this.tipoAsta='inversa'
  }
}
