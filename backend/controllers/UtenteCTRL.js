import { Utente } from "../models/Database.js";


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
      if (tipo !== 'venditore' && tipo !== 'compratore') {
        throw new Error("Tipo utente non valido. Deve essere 'venditore' o 'compratore'.");
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

  static async diminuisciSaldo(email, amount) {
    try {
      const user = await Utente.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error("Utente non trovato");
      }

      if (user.saldo < amount) {
        throw new Error("Saldo insufficiente");
      }

      user.saldo -= amount;

      await user.save();

      console.log(`Il saldo di ${email} è stato aggiornato a ${user.saldo}`); // "The balance of [nickname] has been updated to [new balance]"
      return user.saldo;
    } catch (error) {
      console.error("Errore durante la detrazione del saldo:", error.message); // "Error during balance deduction:"
      throw error;
    }
  }

  static async aumentaSaldo(email, amount) {
    try {
      const user = await Utente.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error("Utente non trovato");
      }

      user.saldo += amount;

      await user.save();

      console.log(`Il saldo di ${email} è stato aggiornato a ${user.saldo}`);
      return user.saldo;
    } catch (error) {
      console.error("Errore durante l'aumento del saldo:", error.message);
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

      // Update user fields if new values are provided
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
}

function generateSaldo() {
  return Math.floor(Math.random() * (2500 - 500 + 1)) + 500;
}

console.log(generateSaldo());
