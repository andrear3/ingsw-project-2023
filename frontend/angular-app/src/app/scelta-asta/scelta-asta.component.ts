import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

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
