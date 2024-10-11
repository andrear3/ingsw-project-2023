import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utente } from '../_models/utente-model';
import { Asta } from '../_models/asta-model';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwtoken: string = '';
  public currentAsta: Asta | null = null;
  public jwtutente: Utente | null = null;
  private status = new BehaviorSubject<boolean>(false);

  setToken(par: string) {
    this.jwtoken = par;
  }

  getToken() {
    return this.jwtoken;
  }

  setUtente(utente: Utente|null) {
    this.jwtutente = utente;
  }

  getUtente(): Utente | null {
    return this.jwtutente;
  }

  setAsta(asta: Asta|null){
    this.currentAsta = asta;
  }

  getAsta(): Asta | null {
    return this.currentAsta;
  }

  getStatus(): Observable<boolean> {
    return this.status.asObservable();
  }

  setStatus(status: boolean): void {
    this.status.next(status);
  }
  
}
