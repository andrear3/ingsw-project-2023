
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../_models/utente-model';
import { Observable } from 'rxjs';
//import { Login } from '../_models/login-model';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getUtenti(){
    let url = `${this.apiUrl}/homepage`;
    return this.http.get<Utente[]>(url, this.httpOptions);
  }
  /*
  registraUtente(utente: Utente){
    let url = `${this.apiUrl}/registration`;
    return this.http.post<Utente>(url, this.httpOptions);
  }
    */

  register(email: string, nome: string, cognome: string, password: string, nickname: string, tipo: string, regione: string, indirizzo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration`, { email, nome, cognome, password, nickname, tipo, regione, indirizzo });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
  
}
