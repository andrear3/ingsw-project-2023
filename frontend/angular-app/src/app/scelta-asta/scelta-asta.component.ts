import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AstaComponent } from '../asta/asta.component';
import { Asta } from '../_models/asta-model';
@Component({
  selector: 'app-scelta-asta',
  standalone: true,
  imports: [ RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './scelta-asta.component.html',
  styleUrl: './scelta-asta.component.scss'
})
export class SceltaAstaComponent {
  constructor(public dialog :MatDialog){}
  closeDialog(){
    this.dialog.closeAll(); 
    
   }
  
}
