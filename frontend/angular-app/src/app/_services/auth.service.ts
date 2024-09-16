import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../_models/utente-model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtoken: string = '';
  public jwtutente: Utente | null = null;

  setToken(par: string) {
    this.jwtoken = par;
  }

  getToken() {
    return this.jwtoken;
  }

  setUtente(utente: Utente) {
    this.jwtutente = utente;
  }

  getUtente(): Utente | null {
    return this.jwtutente;
  }
}
