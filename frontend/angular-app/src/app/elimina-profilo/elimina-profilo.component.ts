import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RestService } from '../_services/rest-api.service';
import { Router } from '@angular/router';
import { Utente } from '../_models/utente-model';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LogInPageComponent } from '../log-in-page/log-in-page.component';

@Component({
  selector: 'app-elimina-profilo',
  standalone: true,
  imports: [],
  templateUrl: './elimina-profilo.component.html',
  styleUrl: './elimina-profilo.component.scss',
})
export class EliminaProfiloComponent {
  private statusSubscription: Subscription = new Subscription();
  showUtente: string = '';
  utente: Utente | null = null;
  constructor(
    public dialog: MatDialog,
    private RestService: RestService,
    private AuthService: AuthService,
    private dialogRef: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.statusSubscription = this.AuthService.getStatus().subscribe(
      (status: boolean) => {
        if (status) {
          this.showUtente = String(this.AuthService.getUtente()?.tipo);
        }
      }
    );
  }
  eliminaProfilo() {
    this.RestService.eliminaUtente().subscribe({
      next: () =>
        this.snackBar.open('Eliminazione avvenuta con successo!', 'Close', {
          duration: 3000,
        }),
      error: () =>
        this.snackBar.open('Errore durante la eliminazine', 'Close', {
          duration: 3000,
        }),
    });
    this.logout();
  }

  logout() {
    this.AuthService.setToken('');
    this.AuthService.setUtente(this.utente);
    this.RestService.setTipoUtente('');
    this.AuthService.setStatus(false);
    this.dialog.closeAll();
    this.router.navigate(['/']);
  }
}
