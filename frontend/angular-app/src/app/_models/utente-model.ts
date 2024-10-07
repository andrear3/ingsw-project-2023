import { TipoUtente } from './tipo-utente-enum';

export interface Utente {
  email: string;
  nickname: string;
  password: string;
  nome: string;
  cognome: string;
  tipo: TipoUtente;
  regione: string;
  linkEsterni: string;
  indirizzo: string;
  saldo: number;
  createdAt?: Date;
  updatedAt?: Date;
}
