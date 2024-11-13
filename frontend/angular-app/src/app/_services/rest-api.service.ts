import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

import { Asta } from '../_models/asta-model';
import { Offerta } from '../_models/offerta-model';
import { Utente } from '../_models/utente-model';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getUtenti(): Observable<Utente[]> {
    let url = `${this.apiUrl}/homepage`;
    return this.http.get<Utente[]>(url, this.httpOptions);
  }

  getAsta(): Observable<{ aste: Asta[]; userInfo: Utente }> {
    const url = `${this.apiUrl}/homepage`;
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<{ aste: Asta[]; userInfo: Utente }>(url, httpOptions);
  }

  //DA TESTARE
  getAstaInversa(): Observable<{ aste: Asta[]; userInfo: Utente }> {
    const url = `${this.apiUrl}/homepage/inversa`;
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<{ aste: Asta[]; userInfo: Utente }>(url, httpOptions);
  }

  getAstaRibasso(): Observable<{ aste: Asta[]; userInfo: Utente }> {
    const url = `${this.apiUrl}/homepage/ribasso`;
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<{ aste: Asta[]; userInfo: Utente }>(url, httpOptions);
  }

  register(utente: Utente) {
    return this.http.post(`${this.apiUrl}/registration`, {
      utente,
    });
  }

  creaAsta(formData: FormData): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    console.log(formData);
    return this.http.post(`${this.apiUrl}/creaAsta`, formData, httpOptions);
  }
  creaAstaRibasso(formData: FormData): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    console.log(formData);
    return this.http.post(
      `${this.apiUrl}/creaAstaRibasso`,
      formData,
      httpOptions
    );
  }
  creaAstaInversa(formData: FormData): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    console.log(formData);
    return this.http.post(
      `${this.apiUrl}/creaAstaInversa`,
      formData,
      httpOptions
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  setTipoUtente(tipo: string): Observable<any> {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    console.log('setipo', tipo);

    return this.http.post(`${this.apiUrl}/setUser`, { tipo }, httpOptions);
  }

  private tipoAstaSubject = new BehaviorSubject<string>('classica');
  tipoAsta$ = this.tipoAstaSubject.asObservable();

  setTipoAsta(tipo: string) {
    this.tipoAstaSubject.next(tipo);
  }

  postOffer(
    valore: number,
    UtenteNickname: string,
    AstumAstaID: number | undefined
  ): Observable<any> {
    const url = `${this.apiUrl}/auctionView`;
    //prendo token per auth
    const token = this.authService.getToken();
    //options..
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(
      url,
      { valore, UtenteNickname, AstumAstaID },
      httpOptions
    );
  }

  //DA TESTAREEEEEEEEEEE
  postOfferInversa(
    valore: number,
    UtenteNickname: string,
    AstumAstaID: number | undefined
  ): Observable<any> {
    const url = `${this.apiUrl}/auctionInversaView`;
    //prendo token per auth
    const token = this.authService.getToken();
    //options..
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(
      url,
      { valore, UtenteNickname, AstumAstaID },
      httpOptions
    );
  }

  updateSaldo(mode: number, valore: number): Observable<any> {
    const url = `${this.apiUrl}/123`;
    //prendo token per auth
    const token = this.authService.getToken();
    //options..
    console.log(mode, valore, url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(url, { mode, valore }, httpOptions);
  }

  postOfferRibasso(
    UtenteNickname: string,
    AstumAstaID: number | undefined
  ): Observable<any> {
    const url = `${this.apiUrl}/auctionRibassoView`;

    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(url, { UtenteNickname, AstumAstaID }, httpOptions);
  }

  postDashboard(nickname: string): Observable<any> {
    const url = `${this.apiUrl}/dashboard`;
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post(url, { nickname }, httpOptions);
  }

  editProfile(formData: FormData): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

    console.log(formData);
    return this.http.post(`${this.apiUrl}/editprofile`, formData, httpOptions);
  }

  //getUtente con nickname per visualizzaPRofilo
  getUtenteByNickname(nickname: string): Observable<Utente> {
    const token = this.authService.getToken(); // Ottieni il token di autorizzazione

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Aggiungi l'autorizzazione se necessaria
      }),
    };

    return this.http.get<Utente>(
      `${this.apiUrl}/utente/nickname/${nickname}`,
      httpOptions
    );
  }

  getOfferteByUtente(nickname: string): Observable<Offerta[]> {
    const url = `${this.apiUrl}/offerte/utente/${nickname}`;
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get<Offerta[]>(url, httpOptions);
  }
}
