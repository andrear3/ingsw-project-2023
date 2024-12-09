import { Component } from '@angular/core';
import { RouterLink, RouterOutlet,NavigationEnd, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthService } from './_services/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarService } from './_services/nav-bar.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, CommonModule, RouterLink,NavbarComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app';
  showNavbar: boolean = true;
  

 constructor(private router:Router,  private authService: AuthService, private navbarService:NavbarService,private cdr: ChangeDetectorRef) {} 
 
 nascondiNavBar(){
  this.showNavbar=(false);
 }

}
