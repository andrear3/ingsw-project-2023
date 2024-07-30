import { Utente } from "../models/Database.js";
import { Sequelize } from "sequelize";

export class UtenteCTRL {
  static async salvaUtente(
    nickname,
    nome,
    cognome,
    email,
    tipo,
    regione,
    linkEsterni,
    indirizzo,
    password
  ) {
    let utente = new Utente({
      nickname: nickname,
      nome: nome,
      cognome: cognome,
      email: email,
      tipo: tipo,
      regione: regione,
      linkEsterni: linkEsterni,
      indirizzo: indirizzo,
      password: password,
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

  static async verificaCredenziali(nickname, password) {
    try {
      const utente = await Utente.findOne({
        where: {
          nickname: nickname,
          password: password, // Consider using hashed password for security
        },
      });
      return utente !== null; // Returns true if the user exists, false otherwise
    } catch (error) {
      console.error("Errore nella verifica delle credenziali!", error);
      return false;
    }
  }
}
