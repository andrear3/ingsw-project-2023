
import { Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Router,RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utente } from '../_models/utente-model';

@Component({
  selector: 'app-preleva-saldo',
  standalone: true,
  imports: [MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,],
  templateUrl: './preleva-saldo.component.html',
  styleUrl: './preleva-saldo.component.scss'
})
export class PrelevaSaldoComponent {
  saldo: number | undefined;
  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router
  ){}
  utente : Utente | null = null ;
  private statusSubscription: Subscription = new Subscription();
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
 prelevaSaldo(){
   
 }
  
}
