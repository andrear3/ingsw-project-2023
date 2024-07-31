import { tipoEnum } from "./tipoEnum";
export interface Utente {
    nickname: string;
    password: string;
    nome: string;
    cognome: string;
    tipo: tipoEnum;
    regione: string;
    linkEsterni: string;
    indirizzo: string;
    createdAt?: Date; 
    updatedAt?: Date;
}

  