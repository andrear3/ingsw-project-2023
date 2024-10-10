import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink ,Router} from '@angular/router';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';

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
  imageFile: File | null = null; // Store the image file
  //astaRibasso
  prezzoMinSegreto:string='';
  decrementoTimer:string='';
  valoreDecremento:string='';

  public tipoAsta: string = 'inversa';

  constructor(
    private RestService: RestService,
    private AuthService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log(this.AuthService.getUtente()?.tipo);
    this.RestService.tipoAsta$.subscribe((tipo) => {
      this.tipoAsta = tipo;
      console.log('Asta type set:', this.tipoAsta);
    });
  }

  // Update the creaAsta method to send FormData directly
  creaAsta() {
    const formData = new FormData();
  
    formData.append('titoloAsta', this.titoloAsta || ''); // Ensure values are not empty
    formData.append('nomeProdotto', this.nomeProdotto || '');
    formData.append('prezzoIniz', this.prezzoIniz || '');
    formData.append('oreAsta', this.oreAsta || '');
    formData.append('categoria', this.categoria || '');
    formData.append('descrizione', this.descrizione || '');
  
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else if (this.url) {
      formData.append('url', this.url); // If no file, add the image URL or base64
    }
  
    this.RestService.creaAsta(formData).subscribe(
      response => console.log('Auction created successfully!', response),
      error => console.error('Error creating auction:', error)
    );
    this.router.navigate(['/homepage']);
  }
  
  creaAstaAlRibasso() {
    const formData = new FormData();
  
    formData.append('titoloAsta', this.titoloAsta || ''); // Ensure values are not empty
    formData.append('nomeProdotto', this.nomeProdotto || '');
    formData.append('prezzoIniz', this.prezzoIniz || '');
    formData.append('oreAsta', this.oreAsta || '');
    formData.append('prezzoMinSegreto', this.prezzoMinSegreto || '');
    formData.append('decrementoTimer', this.decrementoTimer || '');
    formData.append('valoreDecremento', this.valoreDecremento || '');
    formData.append('categoria', this.categoria || '');
    formData.append('descrizione', this.descrizione || '');
  
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else if (this.url) {
      formData.append('url', this.url); // If no file, add the image URL or base64
    }
  
    this.RestService.creaAstaRibasso(formData).subscribe(
      response => console.log('Auction created successfully!', response),
      error => console.error('Error creating auction:', error)
    );
    this.router.navigate(['/homepage']);
  }

  creaAstaInversa() {
    const formData = new FormData();
  
    formData.append('titoloAsta', this.titoloAsta || ''); // Ensure values are not empty
    formData.append('nomeProdotto', this.nomeProdotto || '');
    formData.append('prezzoIniz', this.prezzoIniz || '');
    formData.append('oreAsta', this.oreAsta || '');
    formData.append('categoria', this.categoria || '');
    formData.append('descrizione', this.descrizione || '');
  
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    } else if (this.url) {
      formData.append('url', this.url); // If no file, add the image URL or base64
    }
  
    this.RestService.creaAsta(formData).subscribe(
      response => console.log('Auction created successfully!', response),
      error => console.error('Error creating auction:', error)
    );
    this.router.navigate(['/homepage']);
  }

  astaClassica() {
    this.tipoAsta = 'classica';
    console.log('Asta classica set:', this.tipoAsta);
  }

  astaAlRibasso() {
    console.log('Switching to auction at ribasso'); // Debug output
    this.tipoAsta = 'ribasso';
  }

  astaInversa() {
    console.log('Switching to reverse auction'); // Debug output
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
