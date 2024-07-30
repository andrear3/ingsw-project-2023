
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../_models/utente-model';
import { Login } from '../_models/login-model';
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
}

