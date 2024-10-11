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
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { SaldoComponent } from '../saldo/saldo.component';

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
  
  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router,
    private dialogRef : MatDialog,
  ){}
  private statusSubscription: Subscription = new Subscription();


 modificaProfilo(){
  this.router.navigate(['/modificaProfilo']);
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
openDialogSaldo(){
  this.dialogRef.open(SaldoComponent)
}



}