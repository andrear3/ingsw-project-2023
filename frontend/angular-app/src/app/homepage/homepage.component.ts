import { Component, OnInit, inject } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { asta } from '../_models/asta-model';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  restService = inject(RestService);
  aste: asta[] = [];

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
