import { Data } from '@angular/router';

//enumerazioni
export enum categoriaEnum {
  informatica,
  videogames,
  musica,
  sport,
  collezionismo,
  default,
}
export enum tipoBeneVenditaEnum {
  articolo,
  servizio,
  default,
}
export enum statusAstaEnum {
  venduto,
  inVendita,
  nonVenduto,
  default,
}
//interfaccia

export interface Asta {
  astaId: number;
  nomeBeneInVendita: string;
  titolo: string;
  categoria: categoriaEnum;
  tipoBeneInVendita: tipoBeneVenditaEnum;
  descrizioneAsta: string;
  prezzofinale: number;
  dataFineAsta: Date;
  statusAsta: statusAstaEnum;
  url: string;
  UtenteNickname: string;
  offertaMax: any;
  timeLeft: number;
}
