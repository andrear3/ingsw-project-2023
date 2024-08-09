import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-scelta-asta',
  standalone: true,
  imports: [ RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './scelta-asta.component.html',
  styleUrl: './scelta-asta.component.scss'
})
export class SceltaAstaComponent {

}
