import { Component } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mod-password',
  standalone: true,
  imports: [MatSnackBarModule, FormsModule],
  templateUrl: './mod-password.component.html',
  styleUrls: ['./mod-password.component.scss'],
})
export class ModPasswordComponent {
  password: string = '';

  constructor(
    private restService: RestService,
    private snackBar: MatSnackBar
  ) {}

  modificaPassword() {
    if (this.password == '') {
      this.snackBar.open('La password non può essere vuota', 'Close', {
        duration: 3000,
      });
      return;
    } else {
      this.restService.modificaPassword(this.password).subscribe({
        next: () =>
          this.snackBar.open(
            'La password è stata modificata con successo!',
            'Close',
            {
              duration: 3000,
            }
          ),
        error: () =>
          this.snackBar.open(
            'Errore durante la modifica della password',
            'Close',
            {
              duration: 3000,
            }
          ),
      });
    }
  }
}
