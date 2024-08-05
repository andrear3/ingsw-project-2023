import { TipoUtente } from "./tipo-utente-enum";

export interface Utente {
    email: string;
    nickname: string;
    password: string;
    nome: string;
    cognome: string;
    // Removed dataNascita as it's not in the backend model
    tipo: TipoUtente; // Ensure tipoEnum matches ENUM values in the backend
    regione: string;
    linkEsterni: string;
    indirizzo: string;
    createdAt?: Date; 
    updatedAt?: Date;
}
