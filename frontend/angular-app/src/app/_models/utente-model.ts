import { TipoUtente } from './tipo-utente-enum';

export interface Utente {
  descrizione:string;
  email: string;
  nickname: string;
  password: string;
  nome: string;
  cognome: string;
  tipo: TipoUtente;
  regione: string;
  link1: string;
  link2: string;
  link3: string;
  indirizzo: string;
  saldo: number;
  createdAt?: Date;
  updatedAt?: Date;
  url:string;
}
