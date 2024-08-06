import { Data } from "@angular/router";

//enumerazioni 
enum categoriaEnum{
    informatica,
    videogames,
    musica,
    sport,
    collezionismo,
}
enum tipoBeneVenditaEnum{
    articolo,
    servizio,
}
enum statusAstaEnum{
    venduto,
    inVendita,
    nonVenduto,
}
//interfaccia
export interface Asta{
    astaId:number;
    nomeBeneInVendita:string;
    titolo:string;
    categoria:categoriaEnum;
    tipoBeneInVendita:tipoBeneVenditaEnum;
    descrizioneAsta:string;
    prezzofinale:number;
    dataFineAsta:Date;
    statusAsta:statusAstaEnum;
    url:string;
    UtenteNickname: string;
    offertaMax: any;
    timeLeft: any;
}
