import { Component, OnInit, inject } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Asta } from '../_models/asta-model';

// Import Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  restService = inject(RestService);
  aste: Asta[] = [];

  ngOnInit() {
    this.restService.getAsta().subscribe({
      next: (data: any) => {
        console.log(data);
        this.aste = data;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
