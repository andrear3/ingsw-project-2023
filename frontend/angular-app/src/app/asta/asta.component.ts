import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from "@angular/common/http";
import { throwError } from 'rxjs';
import {
  Router,
  RouteConfigLoadEnd,

  RouterModule,
  
} from '@angular/router';


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
  styleUrls: ['./asta.component.scss']
})
export class AstaComponent implements OnInit {
  options: string[] = [
    'Informatica',
    'Videogames',
    'Musica',
    'Sport',
    'Collezionismo',
  ];
  
  public tipoAsta: string = 'inversa';

  constructor(private RestService: RestService, private AuthService: AuthService) {} 

  ngOnInit() {
    console.log(this.AuthService.getUtente()?.tipo);
    this.RestService.tipoAsta$.subscribe(tipo => {
      this.tipoAsta = tipo;
      console.log('Asta type set:', this.tipoAsta);
    });
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
        };
        reader.readAsDataURL(file);
      } else {
        previewElement.style.backgroundImage = '';
      }
    });
  }








  

  
}