import { OffertaCTRL } from "./OffertaCTRL.js";
import { UtenteCTRL } from "./UtenteCTRL.js";
import { Asta } from "../models/Database.js";
import { AstaAlRibasso,AstaInversa } from "../models/Database.js";
import { Utente } from "../models/Database.js";
import { Offerta } from "../models/Database.js";
import { Sequelize, Op } from "sequelize";
import { database } from "../models/Database.js";
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
        prezzoiniziale: parseFloat(prezzoIniz),
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
      // First, get the IDs of Asta that should be excluded
      const excludedAstaIDs = await AstaAlRibasso.findAll({
        attributes: ['AstumAstaID']
      }).then(result => result.map(r => r.AstumAstaID));
  
      const excludedAstaInversaIDs = await AstaInversa.findAll({
        attributes: ['AstumAstaID']
      }).then(result => result.map(r => r.AstumAstaID));
  
      // Combine both excluded IDs
      const allExcludedIDs = [...new Set([...excludedAstaIDs, ...excludedAstaInversaIDs])];
  
      const asteAttive = await Asta.findAll({
        where: {
          dataFineAsta: {
            [Op.gt]: new Date(), // Greater than the current date
          },
          statusAsta: "inVendita",
          astaID: { // Assuming 'id' is the primary key of Asta
            [Op.notIn]: allExcludedIDs // Exclude IDs present in AstaAlRibasso and AstaInversa
          }
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
  static async controllaScadenzaAste() {
    try {
      const tutteLeAste = await Asta.findAll();
      const tempoCorrente = new Date();

      for (let asta of tutteLeAste) {
        let dataFineAsta = new Date(asta.dataFineAsta);

        // Check if auction time has ended and status is still "inVendita"
        if (tempoCorrente >= dataFineAsta && asta.statusAsta === "inVendita") {
          const offertaMassima = await OffertaCTRL.trovaOffertaMassimaPerAsta(
            asta.astaID
          );

          if (offertaMassima) {
            const { offertaMax, UtenteNickname } = offertaMassima;

            if (offertaMax > 0) {
              // Deduct user's balance and mark auction as "venduto"
              const utente = await Utente.findOne({
                where: { nickname: UtenteNickname },
              });

              if (!utente || utente.saldo < offertaMax) {
                console.error(
                  `Saldo insufficiente per ${UtenteNickname} o utente non trovato.`
                );
                continue; // Skip to next auction if there's an issue with balance
              }

              await UtenteCTRL.diminuisciSaldo(UtenteNickname, offertaMax);
              asta.statusAsta = "venduto";
              asta.prezzofinale = offertaMax;

              console.log(
                `Asta venduta a ${UtenteNickname} con un prezzo finale di ${offertaMax}`
              );
            } else {
              asta.statusAsta = "nonVenduto";
              asta.prezzofinale = 0;
              console.log(`Asta non venduta. Nessuna offerta valida.`);
            }
          } else {
            // No offers were made
            asta.statusAsta = "nonVenduto";
            asta.prezzofinale = 0;
            console.log(`Asta non venduta. Nessuna offerta disponibile.`);
          }

          // Save the auction status regardless of whether it was sold or not
          await asta.save();
        }
      }
    } catch (error) {
      console.error("Errore nel controllare la scadenza delle aste:", error);
    }
  }

  static avviaControlloScadenzaAste() {
    setInterval(async () => {
      try {
        await this.controllaScadenzaAste();
      } catch (error) {
        console.error(
          "Errore durante il controllo delle scadenze delle aste:",
          error
        );
      }
    }, 1000); // Check every second
  }

  //ASTA AL RIBASSO
  static async creaAstaRibasso(req) {
    const transaction = await Asta.sequelize.transaction();

    try {
      const {
        titoloAsta,
        nomeProdotto,
        prezzoIniz,
        oreAsta,
        categoria,
        descrizione,
        prezzoMinSegreto,
        decrementoTimer,
        valoreDecremento,
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
        prezzoiniziale: parseFloat(prezzoIniz),
        dataFineAsta: new Date(Date.now() + oreAsta * 3600000),
        statusAsta: "inVendita",
        url: fileUrl,
        UtenteNickname: utenteNickname,
      };

      // Create auction and log the result
      const asta = await Asta.create(astaData, { transaction });
      console.log("Asta created:", asta); // Log the created auction

      const astaAlRibassoData = {
        prezzoMinSegreto: parseFloat(prezzoMinSegreto),
        decrementoTimer: parseInt(decrementoTimer, 10),
        valoreDecremento: parseFloat(valoreDecremento),
        AstumAstaID: asta.astaID, // Ensure this is set correctly
      };

      // Log the data to be used for AstaAlRibasso
      console.log("AstaAlRibasso data:", astaAlRibassoData);

      await AstaAlRibasso.create(astaAlRibassoData, { transaction });

      await transaction.commit();

      console.log("Asta con ribasso creata con successo:", asta);
      return asta;
    } catch (error) {
      await transaction.rollback();
      console.error(
        "Errore durante la creazione dell'asta con ribasso:",
        error
      );
      throw error;
    }
  }
}
