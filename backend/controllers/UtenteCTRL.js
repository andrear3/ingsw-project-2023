import { Utente } from "../models/Database.js";
import { Sequelize } from "sequelize";

export class UtenteCTRL {
  //non usata??????????????????
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
    let saldo = generateSaldo();

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
      saldo: saldo,
    });
    await utente.save();
  }

  static async recuperaUtenteByEmail(email) {
    try {
      const user = await Utente.findOne({ where: { email } });

      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      console.error(`Error retrieving user with Email ${email}:`, error);
      throw error;
    }
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

  static async setTipoUtente(tipo, email) {
    try {
      const result = await Utente.update(
        { tipo },
        {
          where: { email: email },
        }
      );

      if (result[0] === 0) {
        throw new Error("Errore nel cambiare tipo");
      }

      console.log("Successo! Tipo cambiato");
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  static async diminuisciSaldo(nickname, amount) {
    try {
      const user = await Utente.findOne({
        where: { nickname },
      });

      if (!user) {
        throw new Error("Utente non trovato");
      }

      if (user.saldo < amount) {
        throw new Error("Saldo insufficiente");
      }

      user.saldo -= amount;

      await user.save();

      console.log(`Il saldo di ${nickname} è stato aggiornato a ${user.saldo}`); // "The balance of [nickname] has been updated to [new balance]"
      return user.saldo;
    } catch (error) {
      console.error("Errore durante la detrazione del saldo:", error.message); // "Error during balance deduction:"
      throw error;
    }
  }
}

function generateSaldo() {
  return Math.floor(Math.random() * (2500 - 500 + 1)) + 500;
}

console.log(generateSaldo());
