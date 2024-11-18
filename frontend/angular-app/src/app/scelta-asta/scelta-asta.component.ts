import { CommonModule } from '@angular/common';
import { ChangeDetectorRef,Component, inject,ViewChild,AfterViewInit, viewChild,OnInit,computed,signal } from '@angular/core';
import { Router,RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AstaComponent } from '../asta/asta.component';
import { Asta } from '../_models/asta-model';
import { RestService } from '../_services/rest-api.service';
import { MatButtonModule } from '@angular/material/button'; 
import { MatOptionModule } from '@angular/material/core'; 
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
    private cdRef: ChangeDetectorRef, 
    private RestService: RestService 
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
    this.RestService.setTipoAsta('classica'); 
    this.dialog.closeAll();
  }
  closeDialog2() {
    this.RestService.setTipoAsta('ribasso'); 
    this.dialog.closeAll();
  }


  navigateToAsta() {
    this.router.navigate(['/asta']);
  }
}