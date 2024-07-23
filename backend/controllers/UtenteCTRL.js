import { Utente } from "../models/Database.js";
import { Sequelize } from "sequelize";

export class UtenteCTRL {
    static async salvaUtente(nickname, nome, cognome, email, tipo, regione, linkEsterni, indirizzo, password) {
        let utente = new Utente({
          nickname : nickname,
          nome : nome,
          cognome : cognome,
          email : email,
          tipo : tipo,
          regione : regione,
          linkEsterni : linkEsterni,
          indirizzo : indirizzo,
          password : password,
        });
        await utente.save();
      }

      static async stampaTuttiUtenti() {
        try {
          const utenti = await Utente.findAll();
          utenti.forEach((utente) => {
            console.log(utente.toJSON());
          });
        } catch (error) {
          console.error("Errore nel recupero degli Utenti!", error);
        }
      }
}