import { CommonModule } from '@angular/common';
import { ChangeDetectorRef,Component, inject,ViewChild,AfterViewInit, viewChild,OnInit,computed,signal } from '@angular/core';
import { Router,RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AstaComponent } from '../asta/asta.component';
import { Asta } from '../_models/asta-model';
import { RestService } from '../_services/rest-api.service';

@Component({
  selector: 'app-scelta-asta',
  standalone: true,
  imports: [ RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './scelta-asta.component.html',
  styleUrl: './scelta-asta.component.scss'
})
export class SceltaAstaComponent implements AfterViewInit {
  @ViewChild(AstaComponent) tipoAsta?: AstaComponent; // Indicates that this property will be set after view initialization

  constructor(
    public dialog: MatDialog, 
    private router: Router,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef to force change detection
    private RestService: RestService // Inject the AstaService
  ) {}

  ngAfterViewInit() {
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
  onInversaButtonClick() {
    this.closeDialog2();
    this.navigateToAsta();
  }

  closeDialog() {
    this.RestService.setTipoAsta('classica'); // Update the tipoAsta using the service
    this.dialog.closeAll();
  }
  closeDialog2() {
    this.RestService.setTipoAsta('inversa'); // Update the tipoAsta using the service
    this.dialog.closeAll();
  }


  navigateToAsta() {
    this.router.navigate(['/asta']); // Manually navigate to the '/asta' route
  }
}