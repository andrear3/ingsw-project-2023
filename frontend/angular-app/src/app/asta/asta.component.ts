import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-asta',
  standalone: true,
  imports: [
    NavbarComponent,
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './asta.component.html',
  styleUrls: ['./asta.component.scss'],
})
export class AstaComponent implements OnInit {
  options: string[] = [
    'informatica',
    'videogames',
    'musica',
    'sport',
    'collezionismo',
  ];
  titoloAsta: string = '';
  nomeProdotto: string = '';
  prezzoIniz: string = '';
  oreAsta: string = '';
  categoria: string = '';
  descrizione: string = '';
  url: string = '';
  imageFile: File | null = null;
  prezzoMinSegreto: string = '';
  decrementoTimer: string = '';
  valoreDecremento: string = '';
  public tipoAsta: string = 'inversa';

  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.RestService.tipoAsta$.subscribe((tipo) => {
      this.tipoAsta = tipo;
    });
  }

  creaAsta() {
    if (this.isFormInvalid()) {
      this.snackBar.open(
        'Compila correttamente tutti i campi richiesti!',
        'Close',
        {
          duration: 3000,
        }
      );
      return;
    }

    const formData = new FormData();
    formData.append('titoloAsta', this.titoloAsta || '');
    formData.append('nomeProdotto', this.nomeProdotto || '');
    formData.append('prezzoIniz', this.prezzoIniz || '');
    formData.append('oreAsta', this.oreAsta || '');
    formData.append('categoria', this.categoria || '');
    formData.append('descrizione', this.descrizione || '');

    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else if (this.url) {
      formData.append('url', this.url);
    }

    this.RestService.creaAsta(formData).subscribe({
      next: () =>
        this.snackBar.open('Asta Classica creata con successo! ✅', 'Close', {
          duration: 3000,
        }),
      error: () =>
        this.snackBar.open('Errore durante la creazione asta', 'Close', {
          duration: 3000,
        }),
    });
    this.router.navigate(['/homepage']);
  }

  creaAstaAlRibasso() {
    if (this.isFormInvalid()) {
      this.snackBar.open(
        'Compila correttamente tutti i campi richiesti!',
        'Close',
        {
          duration: 3000,
        }
      );
      return;
    }

    const formData = new FormData();
    formData.append('titoloAsta', this.titoloAsta || '');
    formData.append('nomeProdotto', this.nomeProdotto || '');
    formData.append('prezzoIniz', this.prezzoIniz || '');
    formData.append('oreAsta', this.oreAsta || '');
    formData.append('prezzoMinSegreto', this.prezzoMinSegreto || '');
    formData.append('decrementoTimer', this.decrementoTimer || '');
    formData.append('valoreDecremento', this.valoreDecremento || '');
    formData.append('categoria', this.categoria || '');
    formData.append('descrizione', this.descrizione || '');

    if (Number(this.decrementoTimer) < 1) {
      this.snackBar.open(
        'Compila correttamente tutti i campi richiesti!',
        'Close',
        {
          duration: 3000,
        }
      );
      return;
    }
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else if (this.url) {
      formData.append('url', this.url);
    }

    this.RestService.creaAstaRibasso(formData).subscribe({
      next: () =>
        this.snackBar.open('Asta al Ribasso creata con successo! ✅', 'Close', {
          duration: 3000,
        }),
      error: () =>
        this.snackBar.open('Errore durante la creazione asta', 'Close', {
          duration: 3000,
        }),
    });
    this.router.navigate(['/homepage']);
  }

  creaAstaInversa() {
    if (this.isFormInvalid()) {
      this.snackBar.open(
        'Compila correttamente tutti i campi richiesti!',
        'Close',
        {
          duration: 3000,
        }
      );
      return;
    }

    const formData = new FormData();
    formData.append('titoloAsta', this.titoloAsta || '');
    formData.append('nomeProdotto', this.nomeProdotto || '');
    formData.append('prezzoIniz', this.prezzoIniz || '');
    formData.append('oreAsta', this.oreAsta || '');
    formData.append('categoria', this.categoria || '');
    formData.append('descrizione', this.descrizione || '');

    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else if (this.url) {
      formData.append('url', this.url);
    }

    this.RestService.creaAstaInversa(formData).subscribe({
      next: () =>
        this.snackBar.open('Asta Inversa creata con successo! ✅', 'Close', {
          duration: 3000,
        }),
      error: () =>
        this.snackBar.open('Errore durante la creazione asta', 'Close', {
          duration: 3000,
        }),
    });
    this.router.navigate(['/homepage']);
  }

  astaClassica() {
    this.tipoAsta = 'classica';
  }

  astaAlRibasso() {
    this.tipoAsta = 'ribasso';
  }

  astaInversa() {
    this.tipoAsta = 'inversa';
  }

  @ViewChild('uploadBtn') uploadBtn!: ElementRef;
  @ViewChild('photoPreview') photoPreview!: ElementRef;

  ngAfterViewInit() {
    const uploadElement = this.uploadBtn.nativeElement as HTMLInputElement;
    const previewElement = this.photoPreview.nativeElement as HTMLElement;

    uploadElement.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          previewElement.style.backgroundImage = `url(${e.target.result})`;
          this.url = e.target.result;
        };

        this.imageFile = file;
        reader.readAsDataURL(file);
      } else {
        previewElement.style.backgroundImage = '';
        this.imageFile = null;
      }
    });
  }

  isFormInvalid(): boolean {
    const prezzoInizNum = Number(this.prezzoIniz);
    const oreAstaNum = Number(this.oreAsta);
    const dec = Number(this.decrementoTimer);

    return (
      !this.titoloAsta ||
      !this.nomeProdotto ||
      !this.prezzoIniz ||
      !this.oreAsta ||
      !this.categoria ||
      !this.descrizione ||
      (!this.imageFile && !this.url) ||
      isNaN(prezzoInizNum) ||
      isNaN(oreAstaNum) ||
      prezzoInizNum <= 0 ||
      oreAstaNum < 1
    );
  }
}
