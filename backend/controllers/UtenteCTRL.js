import { Utente } from "../models/Database.js";
import { Offerta } from "../models/Database.js";
import { Asta } from "../models/Database.js";
import { Op } from "sequelize";
import chalk from "chalk";

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
      url: "default-profle",
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

  static async recuperaUtenteByNickname(nickname) {
    try {
      const user = await Utente.findOne({ where: { nickname } });

      if (!user) {
        throw new Error(`User with nickname ${nickname} not found`);
      }

      return user;
    } catch (error) {
      console.error(`Error retrieving user with nickname ${nickname}:`, error);
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
      if (tipo !== "venditore" && tipo !== "compratore") {
        throw new Error(
          "Tipo utente non valido. Deve essere 'venditore' o 'compratore'."
        );
      }
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
      const whereStatement = nickname.includes("@")
        ? { email: nickname }
        : { nickname: nickname };

      const user = await Utente.findOne({
        where: whereStatement,
      });

      if (!user) {
        throw new Error("Utente non trovato");
      }

      if (user.saldo < amount) {
        throw new Error("Saldo insufficiente");
      }

      user.saldo = user.saldo - parseInt(amount);
      await user.save();

      console.log(`Il saldo di ${nickname} è stato aggiornato a ${user.saldo}`);
      return user.saldo;
    } catch (error) {
      console.error("Errore durante la detrazione del saldo:", error.message);
      throw error;
    }
  }

  static async aumentaSaldo(nickname, amount) {
    try {
      const whereStatement = nickname.includes("@")
        ? { email: nickname }
        : { nickname: nickname };

      const user = await Utente.findOne({
        where: whereStatement,
      });

      if (!user) {
        throw new Error("Utente non trovato");
      }

      user.saldo = user.saldo + parseInt(amount);

      await user.save();

      console.log(`Il saldo di ${nickname} è stato aggiornato a ${user.saldo}`);
      return user.saldo;
    } catch (error) {
      console.error("Errore durante l'aumento del saldo:", error.message);
      throw error;
    }
  }

  static async modificaPassword(pswd, email) {
    try {
      const user = await Utente.findOne({ where: { email } });

      user.password = pswd;
      await user.save();
      console.log(`Password updated successfully`);
    } catch (error) {
      console.error("Errore nell'aggiornamento password:", error.message);
      throw error;
    }
  }

  static async modificaUtente(data) {
    try {
      const {
        email,
        nome,
        cognome,
        tipo,
        regione,
        indirizzo,
        linkEsterni,
        url,
        descrizione,
        link1,
        link2,
        link3,
      } = data;

      const user = await Utente.findOne({ where: { email } });

      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }

      user.nome = nome || user.nome;
      user.cognome = cognome || user.cognome;
      user.tipo = tipo || user.tipo;
      user.regione = regione || user.regione;
      user.indirizzo = indirizzo || user.indirizzo;
      user.linkEsterni = linkEsterni || user.linkEsterni;
      user.url = url || user.url;
      user.descrizione = descrizione || user.descrizione;
      user.link1 = link1 || user.link1;
      user.link2 = link2 || user.link2;
      user.link3 = link3 || user.link3;

      await user.save();

      console.log(`User ${email} updated successfully`);
      return user;
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    }
  }

  static async eliminaUtente(email) {
    try {
      await Utente.destroy({
        where: { email },
      });

      console.log(
        chalk.green(`Utente con l'email ${email} eliminato con successo`)
      );
    } catch (error) {
      console.error(
        chalk.red(`Errore durante l'eliminazione dell'utente:`, error.message)
      );
      throw error;
    }
  }

  static async trovaAstePerMail(email) {
    try {
      const utente = await Utente.findOne({
        where: { email: email },
        attributes: ["nickname"],
      });

      if (!utente) {
        console.log("No user found with the given email.");
        return [];
      }
      const nickname = utente.nickname;

      const offerte = await Offerta.findAll({
        attributes: ["AstumAstaID"],
        where: { UtenteNickname: nickname },
      });

      if (!offerte.length) {
        console.log("Nessuna Offerta");
        return [];
      }

      const uniqueAstaIds = [
        ...new Set(offerte.map((offerta) => offerta.AstumAstaID)),
      ];

      const aste = await Asta.findAll({
        where: {
          astaID: {
            [Op.in]: uniqueAstaIds,
          },
        },
      });

      if (!aste.length) {
        console.log("Nessuna asta per gli ID.");
        return [];
      }

      console.log("Aste:", aste);
      return aste;
    } catch (error) {
      console.error("Errore:", error);
      throw error;
    }
  }
}

function generateSaldo() {
  return Math.floor(Math.random() * (2500 - 500 + 1)) + 500;
}

console.log(generateSaldo());
