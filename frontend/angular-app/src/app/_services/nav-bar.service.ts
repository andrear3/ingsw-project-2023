import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  // Utilizziamo BehaviorSubject per mantenere lo stato della navbar
  private showNavbarSubject = new BehaviorSubject<boolean>(true);
  


  // Questo Observable sarà usato per ascoltare le modifiche
  showNavbar$ = this.showNavbarSubject.asObservable();

  // Funzione per nascondere la navbar
  hideNavbar() {
    console.log('LogInPageComponent loaded');
    this.showNavbarSubject.next(true);
  
  }

  // Funzione per mostrare la navbar
  showNavbar() {
    this.showNavbarSubject.next(true);
  }
}