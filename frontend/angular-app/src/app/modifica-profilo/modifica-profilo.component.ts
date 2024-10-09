import { Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Utente } from '../_models/utente-model';
import { Router,RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-modifica-profilo',
  standalone: true,
  imports: [NavbarComponent,
    MatToolbarModule,
   MatIconModule,
   MatAutocompleteModule,
   MatInputModule,
   RouterOutlet,
   CommonModule,
   FormsModule,
   RouterLink,],
  templateUrl: './modifica-profilo.component.html',
  styleUrl: './modifica-profilo.component.scss'
})
export class ModificaProfiloComponent {
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
  
  url:string='';
  imageFile: any;
  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router,
    private restApiService: RestService
  ){}
  private statusSubscription: Subscription = new Subscription();
  
 
 confermaModProfilo() {
  this.router.navigate(['/profile']);}

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

}
