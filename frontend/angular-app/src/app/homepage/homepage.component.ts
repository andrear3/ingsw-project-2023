import { Component, inject, OnInit } from '@angular/core';
import { RestService } from '../_services/rest-api.service';
import { Utente } from '../_models/utente-model';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  restService = inject(RestService);
  utenti: Utente[] = [];

  ngOnInit() {
    this.restService.getUtenti().subscribe({
      next: (data: any) => {
        console.log(data);
        this.utenti = data;
        console.log(this.utenti[0].nickname);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
