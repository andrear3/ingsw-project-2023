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
    private router: Router
  ) {}

<<<<<<< HEAD
  ngOnInit() {
    this.statusSubscription = this.AuthService.getStatus().subscribe(
      (status: boolean) => {
        if (status) {
          this.utente = this.AuthService.getUtente();
          console.log(this.utente);
=======
utente : Utente | null = null ;
ngOnInit() {
  this.statusSubscription = this.AuthService.getStatus().subscribe(
    (status: boolean) => {
      if (status) {
    
        console.log(this.AuthService.getUtente());
        this.utente=this.AuthService.getUtente();
         
        if (this.utente) {
          this.nome = this.utente.nome;
          this.cognome = this.utente.cognome;
          this.nickname = this.utente.nickname;
          this.regione = this.utente.regione;
          this.indirizzo = this.utente.indirizzo;
          this.link1 = this.utente.link1 ;
          this.link2 = this.utente.link2;
          this.link3 = this.utente.link3;
          this.descrizione = this.utente.descrizione;
       
>>>>>>> f88ceafa3eb70b2c2490be39ddc920c8746c1841
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
    const formData = new FormData();

    formData.append('nome', this.nome || '');
    formData.append('cognome', this.cognome || '');
    formData.append('nickname', this.nickname || '');//da rimuovere
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
        this.confermaModProfilo();
      },
      (error) => {
        console.error('Profile update failed:', error);
      }
    );
  }

  confermaModProfilo() {
    this.router.navigate(['/profile']);
  }
=======
  }
  );
}


editProfile(){
  this.restApiService.editProfile(
    this.nome,
    this.cognome,
    this.nickname,
    this.regione,
    this.indirizzo,
    this.url,
    this.descrizione,
    this.link1,
    this.link2,
    this.link3,
  ).subscribe(
    (response) => {
      console.log('modifica effettuata:', response);
    },
    (error) => {
      console.error('modifica fallita:', error);
    }
  );
this.confermaModProfilo();

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
        this.url = e.target.result; // Save base64 string of the image
      };

      this.imageFile = file; // Store the file for uploading
      reader.readAsDataURL(file);
    } else {
      previewElement.style.backgroundImage = '';
      this.imageFile = null;
    }
  });
}

>>>>>>> f88ceafa3eb70b2c2490be39ddc920c8746c1841
}
