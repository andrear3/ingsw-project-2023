import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink , Router} from '@angular/router';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Utente } from '../_models/utente-model';
import { Asta } from '../_models/asta-model';
import { Navigation } from '@angular/router';
@Component({
  selector: 'app-visulizza-profilo',
  standalone: true,
  imports: [ NavbarComponent,
    MatToolbarModule,
   MatIconModule,
   MatAutocompleteModule,
   MatInputModule,
   RouterOutlet,
   CommonModule,
   FormsModule,
   RouterLink,
  ],
  templateUrl: './visulizza-profilo.component.html',
  styleUrl: './visulizza-profilo.component.scss'
})
export class VisulizzaProfiloComponent {
 
  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router,
    private dialogRef : MatDialog,
   
  ){}
  private statusSubscription: Subscription = new Subscription();
  utente: string | null = null;
  ngOnInit() {

   
  
  }
}
