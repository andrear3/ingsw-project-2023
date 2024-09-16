import {
  ChangeDetectorRef,
  AfterViewInit,
  Component,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SceltaAstaComponent } from '../scelta-asta/scelta-asta.component';
import {
  Router,
  RouteConfigLoadEnd,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AstaComponent } from '../asta/asta.component';
import { RestService } from '../_services/rest-api.service';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIcon,
    MatAutocompleteModule,
    MatInputModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild(AstaComponent) tipoAsta?: AstaComponent;

  options: string[] = [
    'Informatica',
    'Videogames',
    'Musica',
    'Sport',
    'Collezionismo',
  ];
  showUtente: string = 'venditore';
  private statusSubscription: Subscription = new Subscription();
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private RestService: RestService,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.statusSubscription = this.AuthService.getStatus().subscribe(
      (status: boolean) => {
        if (status) {
          console.log(this.AuthService.getUtente());
        }
      }
    );
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
    if (!this.tipoAsta) {
      console.error('AstaComponent not found via @ViewChild');
    } else {
      console.log('AstaComponent found:', this.tipoAsta);
    }
  }

  navigateToAsta() {
    this.router.navigate(['/asta']); // Manually navigate to the '/asta' route
  }
  onRibassoButtonClick() {
    this.RestService.setTipoAsta('ribasso');
    this.navigateToAsta();
  }
}
