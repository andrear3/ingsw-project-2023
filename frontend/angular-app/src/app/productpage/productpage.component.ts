import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-productpage',
  standalone: true,
  imports: [ NavbarComponent,],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.scss'
})
export class ProductpageComponent {

}
