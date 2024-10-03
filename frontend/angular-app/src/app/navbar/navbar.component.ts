import { AfterViewInit, Component,Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs';
import { SceltaAstaComponent } from '../scelta-asta/scelta-asta.component'; // Ensure the path is correct
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field'; // Optional if you are using <mat-form-field>
import { MatInputModule } from '@angular/material/input'; // Required for <input> within the autocomplete
import { MatIconModule } from '@angular/material/icon';
import {  OnInit, ViewChild } from '@angular/core';
import { NavbarService } from '../_services/nav-bar.service';
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
  styleUrls: ['./navbar.component.scss'], // Ensure this is 'styleUrls'
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
  showUtente: string = 'venditore';

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
          console.log(this.showUtente);
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

  onInversaButtonClick() {
    this.RestService.setTipoAsta('inversa');
    this.navigateToAsta();
  }


  changeType(){
    this.showUtente = String(this.AuthService.getUtente()?.tipo);
    if(this.showUtente=="compratore"){
      this.RestService.setTipoUtente('venditore').subscribe({
        next: (response) => {},
        error: (err) => {
          console.error('Error', err);
        },
      });
      this.showUtente="venditore";
      console.log("chiamala fuznione");
    


      
    }else if(this.showUtente=="venditore") {
      this.RestService.setTipoUtente('compratore').subscribe({
        next: (response) => {},
        error: (err) => {
          console.error('Error', err);
        },
      });
      this.showUtente="compratore"; 
      console.log("chiama asgggegeg") ;
      
    }
    
  }
 

}
