import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent,CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-app';
}
