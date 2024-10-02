import { CommonModule } from '@angular/common';
import { ChangeDetectorRef,Component, inject,ViewChild,AfterViewInit, viewChild,OnInit,computed,signal } from '@angular/core';
import { Router,RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AstaComponent } from '../asta/asta.component';
import { Asta } from '../_models/asta-model';
import { RestService } from '../_services/rest-api.service';
import { MatButtonModule } from '@angular/material/button'; // If using Material buttons
import { MatOptionModule } from '@angular/material/core'; // If using mat-option
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-scelta-asta',
  standalone: true,
  imports: [ RouterOutlet,CommonModule,RouterLink,RouterModule, AstaComponent, MatButtonModule, MatOptionModule, NavbarComponent],
  templateUrl: './scelta-asta.component.html',
  styleUrl: './scelta-asta.component.scss'
})
export class SceltaAstaComponent implements AfterViewInit {
  @ViewChild(AstaComponent) tipoAsta?: AstaComponent; 

  constructor(
    public dialog: MatDialog, 
    private router: Router,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef to force change detection
    private RestService: RestService // Inject the AstaService
  ) {}

  ngAfterViewInit() {
    console.log('View initialized');
    if (!this.tipoAsta) {
      console.error('AstaComponent not found via @ViewChild');
    } else {
      console.log('AstaComponent found:', this.tipoAsta);
    }
  }

  onClassicaButtonClick() {
    this.closeDialog();
    this.navigateToAsta();
  }
  onRibassoButtonClick() {
    this.closeDialog2();
    this.navigateToAsta();
  }

  closeDialog() {
    this.RestService.setTipoAsta('classica'); // Update the tipoAsta using the service
    this.dialog.closeAll();
  }
  closeDialog2() {
    this.RestService.setTipoAsta('ribasso'); // Update the tipoAsta using the service
    this.dialog.closeAll();
  }


  navigateToAsta() {
    this.router.navigate(['/asta']); // Manually navigate to the '/asta' route
  }
}