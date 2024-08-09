import { Component } from '@angular/core';
import { RouteConfigLoadEnd, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-asta',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './asta.component.html',
  styleUrl: './asta.component.scss'
})
export class AstaComponent {

}
