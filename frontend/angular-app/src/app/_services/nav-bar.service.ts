import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  private showNavbarSubject = new BehaviorSubject<boolean>(true);
  


  showNavbar$ = this.showNavbarSubject.asObservable();


  hideNavbar() {
    console.log('LogInPageComponent loaded');
    this.showNavbarSubject.next(true);
  
  }


  showNavbar() {
    this.showNavbarSubject.next(true);
  }
}