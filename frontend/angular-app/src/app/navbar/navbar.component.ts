import { AfterViewInit, Component,Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs';
import { SceltaAstaComponent } from '../scelta-asta/scelta-asta.component'; 
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import {  OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../_services/nav-bar.service';
import { Utente } from '../_models/utente-model';
import { TipoUtente } from '../_models/tipo-utente-enum';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIcon,
    RouterOutlet,
    CommonModule,
    RouterLink,
    MatSelectModule,  
    MatOptionModule, 
    RouterLink,
    MatAutocompleteModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'], 
})
export class NavbarComponent implements OnInit {
  options: string[] = [
    'Informatica',
    'Videogames',
    'Musica',
    'Sport',
    'Collezionismo',
  ];
  private statusSubscription: Subscription = new Subscription();
  showUtente: string ='';
  utente: Utente | null = null;

  constructor(
    public dialog: MatDialog,
    private RestService: RestService,
    private AuthService: AuthService,
   private navbarService: NavbarService,
   private router:Router,
  ) { console.log('Navbar initialized');}

  @Input() isVisible: boolean = true;
  isNavbarVisible: boolean = true;

  ngOnInit() {
    this.statusSubscription = this.AuthService.getStatus().subscribe(
      (status: boolean) => {
        if (status) {
          this.showUtente = String(this.AuthService.getUtente()?.tipo);
          console.log("navbar ",this.showUtente);
        }
      }
    );
    this.navbarService.showNavbar$.subscribe(isVisible => {
      this.isNavbarVisible = isVisible;
      console.log('Navbar visibile:', this.isNavbarVisible);
    });
  
  }

  openDialog() {
    this.dialog.open(SceltaAstaComponent, {
      position: { top: '5%', right: '17%' },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  ngAfterViewInit() {
  }

  navigateToAsta() {
    this.router.navigate(['/asta']);
  }
  navigateToLeMieAste() {
    this.router.navigate(['/leMieAste']);
  }
  onInversaButtonClick() {
    this.RestService.setTipoAsta('inversa');
    this.navigateToAsta();
  }
  logout(){
    this.AuthService.setToken('');
    this.AuthService.setUtente(this.utente);
    this.RestService.setTipoUtente(' ');
    this.AuthService.setStatus(false);
    this.router.navigate(['/']);
  }


}
