import { Component, Input } from '@angular/core';
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
  RouteConfigLoadEnd,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
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
export class NavbarComponent {
  options: string[] = [
    'Informatica',
    'Videogames',
    'Musica',
    'Sport',
    'Collezionismo',
  ];
  showUtente: string = 'venditore';
  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(SceltaAstaComponent, {
      position: { top: '5%', right: '17%' },
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
