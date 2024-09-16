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

  setToken(par: string){
    this.jwtoken = par;
    console.log('set:');
    console.log(this.jwtoken);
    console.log('set:');
  }
  //undefined?
  getToken(){
    return this.jwtoken;
  }
}
