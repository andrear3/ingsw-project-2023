import { Component, OnInit, inject } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Asta } from '../_models/asta-model';

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
    FormsModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  restService = inject(RestService);
  aste: Asta[] = [];

  ngOnInit() {
    this.restService.getAsta().subscribe({
      next: (data: Asta[]) => {
        console.log(data);
        this.aste = data;
      },
      error: (err: any) => {
        console.error('Error fetching data:', err);
      },
    });
  }
}

function secondsToDhms(seconds: number) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
  var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
