
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
import { PrelevaSaldoComponent } from '../preleva-saldo/preleva-saldo.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [ MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,],
  templateUrl: './saldo.component.html',
  styleUrl: './saldo.component.scss'
})
export class SaldoComponent {
  saldo: number | undefined;
  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router,
    private dialogRef : MatDialog,
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
  openDialogSaldoPreleva(){
    this.dialogRef.open(PrelevaSaldoComponent)
  }
  




}
