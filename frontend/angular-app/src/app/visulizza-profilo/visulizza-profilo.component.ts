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
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
  ){}
 
  nickname: string | null = null;
  utente:Utente|null=null;
  errorMessage: string | null = null;
  ngOnInit() {
    this.nickname = this.route.snapshot.paramMap.get('nickname');
    console.log('il nickname', this.nickname);
    if (this.nickname) {
      this.RestService.getUtenteByNickname(this.nickname).subscribe({
        next: (data) => {
          this.utente = data; // Memorizza i dati dell'utente
          console.log('Utente trovato:', this.utente);
        },
        error: (err) => {
          console.error('Errore nel recupero dell\'utente:', err);
          this.errorMessage = 'Errore nel recupero delle informazioni dell\'utente';
        },
      });
    }
  }
}