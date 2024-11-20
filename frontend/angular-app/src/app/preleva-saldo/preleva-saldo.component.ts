import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {
  Router,
  RouteConfigLoadEnd,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utente } from '../_models/utente-model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preleva-saldo',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './preleva-saldo.component.html',
  styleUrl: './preleva-saldo.component.scss',
})
export class PrelevaSaldoComponent {
  cifra: number = 1;
  constructor(
    private restService: RestService,
    private AuthService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PrelevaSaldoComponent>
  ) {}
  utente: Utente | null = null;
  private statusSubscription: Subscription = new Subscription();
  ngOnInit() {
    this.statusSubscription = this.AuthService.getStatus().subscribe(
      (status: boolean) => {
        if (status) {
          console.log(this.AuthService.getUtente());
          this.utente = this.AuthService.getUtente();
        }
      }
    );
  }
  prelevaSaldo() {
    this.restService.updateSaldo(0, this.cifra).subscribe({
      next: () => {
        this.snackBar.open(
          `${this.cifra}€ prelevati con successo ✅`,
          'Close',
          {
            duration: 3000,
          }
        );
        this.dialogRef.close();
        this.router.navigate(['/homepage']);
      },
      error: () => {
        this.snackBar.open('Errore', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
