import { Asta } from "../models/Database.js";
import { Utente } from "../models/Database.js";
import { Offerta } from "../models/Database.js";
import { Sequelize, Op } from "sequelize";

export class AstaCTRL {
  static async recuperaAstaById(astaID) {
    try {
      const asta = await Asta.findByPk(astaID);

      if (!asta) {
        throw new Error(`Asta with ID ${astaID} not found`);
      }

      return asta;
    } catch (error) {
      console.error(`Error retrieving auction with ID ${astaID}:`, error);
      throw error;
    }
  }

  //titolo, nome prodotto, prezzo iniziale, categoria, url, ore, descrizione
  static async creaAstaClassica(asta) {
    try {
      let temp = new Asta();
      await asta.save();
    } catch (error) {
      console.error("Errore durante la creazione dell'asta", error);
      throw error;
    }
  }

  static async stampaTutteAste() {
    try {
      const aste = await Asta.findAll();
      aste.forEach((asta) => {
        console.log(asta.toJSON());
      });
    } catch (error) {
      console.error("Errore nel recupero delle Aste!", error);
    }
  }

  static async creaAsta(req) {
    try {
      const {
        titoloAsta,
        nomeProdotto,
        prezzoIniz,
        oreAsta,
        categoria,
        descrizione,
      } = req.body;

      const user = await Utente.findOne({ where: { email: req.user.email } });

      if (!user) {
        throw new Error("User not found");
      }

      const fileUrl = req.file ? req.file.filename : null;
      const utenteNickname = user.nickname;

      const astaData = {
        nomeBeneInVendita: nomeProdotto,
        titolo: titoloAsta,
        categoria: categoria,
        tipoBeneInVendita: "articolo",
        descrizioneAsta: descrizione,
        prezzofinale: parseFloat(prezzoIniz),
        dataFineAsta: new Date(Date.now() + oreAsta * 3600000),
        statusAsta: "inVendita",
        url: fileUrl,
        UtenteNickname: utenteNickname,
      };

      const asta = await Asta.create(astaData);
      console.log("Asta saved to database:", asta);
    } catch (error) {
      console.error("Error saving auction to database:", error);
      throw new Error("Could not save auction");
    }
  }

  static async cercaAsta(id) {
    try {
      let asta = await Asta.findByPk(id);
      return asta;
    } catch (error) {
      console.error("Error retrieving Asta:", error);
      throw error;
    }
  }

  //CONTROLLO SCADENZA ASTA (DA CONTINUARE)
  static async timerAsta() {
    try {
      let asta = await AstaCTRL.recuperaAsteAttive();

      const dataCorrente = new Date();
      const dataAsta = new Date(asta.createdAt);

      if (dataAsta.getTime() === dataCorrente.getTime()) {
        console.log("The dates are equal.");
      } else if (dataAsta.getTime() > dataCorrente.getTime()) {
        console.log("The createdOn date is after the current date.");
      } else {
        console.log("The createdOn date is before the current date.");
      }
    } catch (error) {
      console.error("Error checking value:", error);
    }
  }

  static async recuperaAsteAttive() {
    try {
      const asteAttive = await Asta.findAll({
        where: {
          dataFineAsta: {
            [Op.gt]: new Date(), //Più grandi della data attuale
          },
          statusAsta: "inVendita",
        },
      });

      if (asteAttive.length > 0) {
        console.log("Aste attive:", asteAttive);
      } else {
        console.log("Nessuna asta è attiva");
      }
      return asteAttive;
    } catch (error) {
      console.error("Errore nel recupero aste:", error);
    }
  }

  static async getTimeLeftForAsteByIds(ids) {
    try {
      let timeLeftResults = [];

      for (let astaID of ids) {
        let asta = await this.recuperaAstaById(astaID);
        let dataFineAsta = new Date(asta.dataValues.dataFineAsta);
        const dataCorrente = new Date();

        const timeLeftInMilliseconds =
          dataFineAsta.getTime() - dataCorrente.getTime();

        if (timeLeftInMilliseconds > 0) {
          const timeLeftInSeconds = Math.floor(timeLeftInMilliseconds / 1000);
          timeLeftResults.push({
            id: astaID,
            timeLeft: timeLeftInSeconds,
          });
        } else {
          timeLeftResults.push({
            id: astaID,
            timeLeft: 0,
          });
        }
      }

      return timeLeftResults;
    } catch (error) {
      console.error("Error calculating time left:", error);
      throw error;
    }
  }
}
