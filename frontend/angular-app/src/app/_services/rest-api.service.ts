import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../_models/utente-model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getUtenti(): Observable<Utente[]> {
    let url = `${this.apiUrl}/homepage`;
    return this.http.get<Utente[]>(url, this.httpOptions);
  }

  getAsta(): Observable<any> {
    const url = `${this.apiUrl}/homepage`;

    const token = this.authService.getToken();
    console.log(token);

    const httpOptionsWithToken = {
      headers: this.httpOptions.headers.set('Authorization', `Bearer ${token}`),
    };

    console.log('Token:', token); // Log token for debugging

    return this.http.get<any>(url, { headers: httpOptionsWithToken.headers });
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

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`);
  }
  private tipoAstaSubject = new BehaviorSubject<string>('classica'); // default value
  tipoAsta$ = this.tipoAstaSubject.asObservable(); // Observable to listen for changes

  // Method to update the tipoAsta
  setTipoAsta(tipo: string) {
    this.tipoAstaSubject.next(tipo);
  }
}
