import { Component ,OnInit} from '@angular/core';
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
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utente } from '../_models/utente-model';

@Component({
  selector: 'app-profile',
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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  email: string = '';
  nome: string = '';
  cognome: string = '';
  nickname: string = '';
  regione: string = '';
  indirizzo: string = '';
  link: string = '';
  descrizione: string = '';
  showModifica: string='!modifica';
  constructor(
    private RestService: RestService,
    private AuthService: AuthService
  ){}
  private statusSubscription: Subscription = new Subscription();

 modificaProfilo(){
  this.showModifica='modifica';
 }
 confermaModProfilo() {
  this.showModifica = '!modifica';
}
utente : Utente | null = null ;
ngOnInit() {
  this.statusSubscription = this.AuthService.getStatus().subscribe(
    (status: boolean) => {
      if (status) {
    
        console.log(this.AuthService.getUtente());
        this.utente=this.AuthService.getUtente();
        
       
        }
    }
  );
}
}



