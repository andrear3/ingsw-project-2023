import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../_models/utente-model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

import { Asta } from '../_models/asta-model';

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

  register(
    email: string,
    nome: string,
    cognome: string,
    password: string,
    nickname: string,
    tipo: string,
    regione: string,
    indirizzo: string
  ) {
    return this.http.post(`${this.apiUrl}/registration`, {
      email,
      nome,
      cognome,
      password,
      nickname,
      tipo,
      regione,
      indirizzo,
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
    return this.http.post(`${this.apiUrl}/creaAstaRibasso`, formData, httpOptions);
  }
  creaAstaInversa(formData: FormData): Observable<any> {
    const token = this.authService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    console.log(formData);
    return this.http.post(`${this.apiUrl}/creaAstaInversa`, formData, httpOptions);
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
    AstumAstaID: number
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


  editProfile(
    nome: string,
    cognome: string,
    nickname: string,
    regione: string,
    indirizzo: string,
    url:string,
    descrizione:string,
    link1:string,
    link2:string,
    link3:string,
  ) {
    return this.http.post(`${this.apiUrl}/editprofile`, {
      nome,
      cognome,
      nickname,
      regione,
      indirizzo,
      url,
      descrizione,
      link1,
      link2,
      link3,
    });
  }




  
}
