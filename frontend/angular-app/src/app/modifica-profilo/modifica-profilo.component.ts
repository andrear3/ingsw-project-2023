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
import { Subscription } from 'rxjs/internal/Subscription';
import { Utente } from '../_models/utente-model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modifica-profilo',
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
  templateUrl: './modifica-profilo.component.html',
  styleUrls: ['./modifica-profilo.component.scss'],
})
export class ModificaProfiloComponent implements OnInit {
  email: string = '';
  nome: string = '';
  cognome: string = '';
  nickname: string = '';
  regione: string = '';
  indirizzo: string = '';
  link1: string = '';
  link2: string = '';
  link3: string = '';
  descrizione: string = '';
  url: string = '';
  imageFile: File | null = null;
  private statusSubscription: Subscription = new Subscription();
  utente: Utente | null = null;

  @ViewChild('uploadBtn') uploadBtn!: ElementRef;
  @ViewChild('photoPreview') photoPreview!: ElementRef;

  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.statusSubscription = this.AuthService.getStatus().subscribe(
      (status: boolean) => {
        if (status) {
          this.utente = this.AuthService.getUtente();
          console.log(this.utente);

          if (this.utente) {
            this.nome = this.utente.nome;
            this.cognome = this.utente.cognome;
            this.nickname = this.utente.nickname;
            this.regione = this.utente.regione;
            this.indirizzo = this.utente.indirizzo;
            this.link1 = this.utente.link1;
            this.link2 = this.utente.link2;
            this.link3 = this.utente.link3;
            this.descrizione = this.utente.descrizione;
          }
        }
      }
    );
  }

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

  editProfile() {
    if (this.isFormInvalid()) {
      this.snackBar.open('Compila tutti i campi richiesti!', 'Close', {
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.nome || '');
    formData.append('cognome', this.cognome || '');
    formData.append('nickname', this.nickname || '');
    formData.append('regione', this.regione || '');
    formData.append('indirizzo', this.indirizzo || '');
    formData.append('descrizione', this.descrizione || '');
    formData.append('link1', this.link1 || '');
    formData.append('link2', this.link2 || '');
    formData.append('link3', this.link3 || '');

    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else if (this.url) {
      formData.append('url', this.url);
    }

<<<<<<< HEAD
    this.RestService.editProfile(formData).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        this.router.navigate(['/profile']);
  
      },
      (error) => {
        console.error('Profile update failed:', error);
      }
    );
  }

  
=======
    this.RestService.editProfile(formData).subscribe({
      next: () =>
        this.snackBar.open('Profilo modificato ✅', 'Close', {
          duration: 3000,
        }),

      error: () =>
        this.snackBar.open('Errore durante la creazione asta', 'Close', {
          duration: 3000,
        }),
    });
    this.router.navigate(['/homepage']);
  }

  isFormInvalid(): boolean {
    return (
      !this.nome ||
      !this.cognome ||
      !this.nickname ||
      !this.regione ||
      !this.indirizzo ||
      !this.descrizione ||
      !this.link1 ||
      !this.link2 ||
      !this.link3
    );
  }
>>>>>>> c6660271144bff9a4973c58add6d6b919d911c54
}
