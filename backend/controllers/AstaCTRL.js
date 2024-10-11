import { OffertaCTRL } from "./OffertaCTRL.js";
import { UtenteCTRL } from "./UtenteCTRL.js";
import { Asta } from "../models/Database.js";
import { AstaAlRibasso, AstaInversa } from "../models/Database.js";
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

  static async recuperaAsteAttive() {
    try {
      // First, get the IDs of Asta that should be excluded
      const excludedAstaIDs = await AstaAlRibasso.findAll({
        attributes: ["AstumAstaID"],
      }).then((result) => result.map((r) => r.AstumAstaID));

      const excludedAstaInversaIDs = await AstaInversa.findAll({
        attributes: ["AstumAstaID"],
      }).then((result) => result.map((r) => r.AstumAstaID));

      // Combine both excluded IDs
      const allExcludedIDs = [
        ...new Set([...excludedAstaIDs, ...excludedAstaInversaIDs]),
      ];

      const asteAttive = await Asta.findAll({
        where: {
          dataFineAsta: {
            [Op.gt]: new Date(), // Greater than the current date
          },
          statusAsta: "inVendita",
          astaID: {
            // Assuming 'id' is the primary key of Asta
            [Op.notIn]: allExcludedIDs, // Exclude IDs present in AstaAlRibasso and AstaInversa
          },
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

  //nuova
  static async recuperaAsteAlRibassoAttive() {
    try {
      const activeAstaAlRibasso = await AstaAlRibasso.findAll({
        attributes: ["AstumAstaID"],
      });

      const activeAstaIDs = activeAstaAlRibasso.map((item) => item.AstumAstaID);

      if (activeAstaIDs.length === 0) {
        console.log("Nessuna asta al ribasso attiva");
        return [];
      }

      const astasAlRibasso = await Asta.findAll({
        where: {
          astaID: {
            [Op.in]: activeAstaIDs,
          },
          statusAsta: "inVendita",
          dataFineAsta: {
            [Op.gt]: new Date(),
          },
        },
        include: [
          {
            model: AstaAlRibasso,
            attributes: [
              "prezzoMinSegreto",
              "decrementoTimer",
              "valoreDecremento",
            ],
          },
        ],
      });

      if (astasAlRibasso.length > 0) {
        console.log("Aste al ribasso attive:", astasAlRibasso);
      } else {
        console.log("Nessuna asta al ribasso è attiva");
      }

      return astasAlRibasso;
    } catch (error) {
      console.error("Errore nel recupero aste al ribasso:", error);
      throw error;
    }
  }

  static async ottieniPrezzoCorrenteAstaRibasso(astaID) {
    try {
      const asta = await Asta.findOne({
        where: { astaID },
      });

      if (!asta) {
        console.log("Asta non trovata.");
        return null;
      }

      return asta.prezzoiniziale;
    } catch (error) {
      console.error(
        "Errore nel recuperare il prezzo iniziale dell'asta:",
        error
      );
      throw error;
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
  static async gestisciAstaAlRibasso() {
    try {
      // Retrieve active downward auctions
      const asteAlRibassoAttive = await AstaAlRibasso.findAll({
        where: {
          // You can add any additional filters here if necessary
        },
      });

      const currentTime = new Date();

      for (let astaRibasso of asteAlRibassoAttive) {
        // Retrieve the corresponding Asta based on AstumAstaID
        const asta = await Asta.findOne({
          where: {
            astaID: astaRibasso.AstumAstaID,
            statusAsta: "inVendita",
            dataFineAsta: { [Op.gt]: currentTime }, // Only future auctions
          },
        });

        // Check if the Asta was found
        if (!asta) {
          console.log(
            `Asta non trovata per l'asta al ribasso ID: ${astaRibasso.id}`
          );
          continue; // Skip to the next iteration if Asta is not found
        }

        const timeSinceLastDecrement = currentTime - astaRibasso.updatedAt; // Use updatedAt from AstaAlRibasso

        // Check if it's time to decrement the price
        if (timeSinceLastDecrement >= astaRibasso.decrementoTimer * 1000) {
          const newPrice = asta.prezzoiniziale - astaRibasso.valoreDecremento;

          // Check if the new price is below the secret minimum price
          if (newPrice <= astaRibasso.prezzoMinSegreto) {
            // Update auction status to non-sold
            asta.statusAsta = "nonVenduto";
            await asta.save();

            console.log(
              `Asta al ribasso fallita. Il prezzo ha raggiunto il minimo segreto per l'asta con ID: ${asta.astaID}`
            );
            continue; // Skip to the next iteration
          }

          // Update the price and timestamp
          asta.prezzoiniziale = newPrice;
          asta.updatedAt = new Date(); // Update the timestamp of the Asta
          await asta.save();

          console.log(
            `Prezzo ridotto per l'asta al ribasso con ID: ${asta.astaID}. Nuovo prezzo: ${newPrice}`
          );
        }

        // Check for the maximum offer
        const offertaMassima = await OffertaCTRL.trovaOffertaMassimaPerAsta(
          asta.astaID
        );

        if (offertaMassima) {
          asta.statusAsta = "venduto";
          asta.prezzofinale = offertaMassima.valore;
          await asta.save();

          console.log(
            `Asta al ribasso venduta a ${offertaMassima.UtenteNickname} per il prezzo di ${offertaMassima.valore}`
          );
        }
      }
    } catch (error) {
      console.error("Errore nella gestione delle aste al ribasso:", error);
      throw error; // Rethrow the error to propagate it up
    }
  }

  static avviaControlloAsteAlRibasso() {
    // Set an interval to manage downward auctions every 60 seconds
    const intervalId = setInterval(async () => {
      try {
        await AstaCTRL.gestisciAstaAlRibasso();
      } catch (error) {
        console.error(
          "Errore durante il controllo delle aste al ribasso:",
          error
        );
        // Optionally, clear the interval if there's an error
        clearInterval(intervalId);
      }
    }, 10000);
  }
}
