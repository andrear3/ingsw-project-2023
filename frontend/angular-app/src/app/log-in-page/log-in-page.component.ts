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
    private navbarService: NavbarService,
  
  ) {}
  
 
 ngAfterViewInit() {
    // Nascondi la navbar quando viene caricata la pagina di login
    console.log("chiamato NGOnINITn ")
    this.appComponent.nascondiNavBar();
  }


  async login(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.restApiService.login(this.email, this.password).subscribe(
        async (response) => {  // Usa async qui per usare await all'interno
          console.log('Login successful:', response?.accessToken);
          
          if (response?.accessToken) {
            this.authService.setToken(response?.accessToken);
            console.log('Token impostato correttamente:', this.authService.getToken());
  
            try {
              // Controllo del tipo di utente e impostazione
              if (this.tipo === 'venditore') {
                await this.setTipoUtente('venditore');
                
              } else if (this.tipo === 'compratore') {
                await this.setTipoUtente('compratore');
                
              }
              resolve(); // Risolvi la Promise dopo che tutto è completato
            } catch (err) {
              console.error('Errore durante setTipoUtente:', err);
              reject(err); // Rigetta se c'è un errore in setTipoUtente
            }
  
          } else {
            console.error('Token non ricevuto o nullo');
            reject('Token non ricevuto o nullo');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          reject(error); // In caso di errore, rigetta la Promise
        }
      );
    });
  }
  
  // Funzione per setTipoUtente come Promise
  setTipoUtente(tipo: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.restApiService.setTipoUtente(tipo).subscribe(
        (response) => {
          console.log(`Tipo utente impostato a ${tipo}:`, response);
          resolve(); // Risolvi la Promise quando setTipoUtente ha successo
        },
        (error) => {
          console.error('Errore impostazione tipo utente:', error);
          reject(error); // Rigetta la Promise in caso di errore
        }
      );
    });
  }
  
  async login2() {
    try {
      await this.login();  // Aspetta che la funzione login termini
      console.log('Navigo a /homepage');
      this.router.navigate(['/homepage']);  // Naviga solo dopo che il login è completato
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  }
  
 
}
