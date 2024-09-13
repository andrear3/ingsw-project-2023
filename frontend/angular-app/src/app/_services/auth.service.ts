import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtoken = '';
  setToken(jwtoken: string) {
    this.jwtoken = jwtoken;
  }

  getToken(): string | undefined {
    return this.jwtoken;
  }
}
