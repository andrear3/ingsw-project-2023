
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../_models/utente-model';
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

  registraUtente(utente: Utente){
    let url = `${this.apiUrl}/registration`;
    return this.http.post<Utente>(url, this.httpOptions);
  }
  
}

import { Observable } from 'rxjs';
//login
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }
}

