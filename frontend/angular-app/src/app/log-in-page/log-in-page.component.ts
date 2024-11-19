import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { RestService } from '../_services/rest-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {
 
  RouteConfigLoadEnd,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../app.component';
import { NavbarService } from '../_services/nav-bar.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,
    RouterModule,NavbarComponent,MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,],
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss'],
})
export class LogInPageComponent {
  email: string = '';
  password: string = '';
  options: string[] = ['venditore', 'compratore'];
  tipo: string = '';

  constructor(
    private restApiService: RestService,
    private authService: AuthService,
    private router: Router,
    private appComponent:AppComponent, 
  
  
  ) {}
  
 
 ngAfterViewInit() {
    console.log("chiamato NGOnINITn ")
    this.appComponent.nascondiNavBar();
  }


  async login(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.restApiService.login(this.email, this.password).subscribe(
        async (response) => {
          console.log('Login successful:', response?.accessToken);
          
          if (response?.accessToken) {
            this.authService.setToken(response?.accessToken);
            console.log('Token impostato correttamente:', this.authService.getToken());
  
            try {
              if (this.tipo === 'venditore') {
                await this.setTipoUtente('venditore');
                
              } else if (this.tipo === 'compratore') {
                await this.setTipoUtente('compratore');
                
              }
              resolve();
            } catch (err) {
              console.error('Errore durante setTipoUtente:', err);
              reject(err);
            }
  
          } else {
            console.error('Token non ricevuto o nullo');
            reject('Token non ricevuto o nullo');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          reject(error);
        }
      );
    });
  }
  

  setTipoUtente(tipo: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.restApiService.setTipoUtente(tipo).subscribe(
        (response) => {
          console.log(`Tipo utente impostato a ${tipo}:`, response);
          resolve(); 
        },
        (error) => {
          console.error('Errore impostazione tipo utente:', error);
          reject(error);
        }
      );
    });
  }
  
  async login2() {
    try {
      await this.login();
      console.log('Navigo a /homepage');
      this.router.navigate(['/homepage']);  
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  }
  navigateToRegistration() {
    
    this.router.navigate(['/registration']);
  }
 
}
