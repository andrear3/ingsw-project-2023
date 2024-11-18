import { OffertaCTRL } from "./OffertaCTRL.js";
import { UtenteCTRL } from "./UtenteCTRL.js";
import { Asta, AstaAlRibasso, AstaInversa, Utente, Offerta} from "../models/Database.js";
import { Op } from "sequelize";

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

      const asta = await Asta.create(astaData, { transaction });
      console.log("Asta created:", asta); 

      const astaAlRibassoData = {
        prezzoMinSegreto: parseFloat(prezzoMinSegreto),
        decrementoTimer: parseInt(decrementoTimer, 10),
        valoreDecremento: parseFloat(valoreDecremento),
        AstumAstaID: asta.astaID, 
      };

 
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

      const excludedAstaIDs = await AstaAlRibasso.findAll({
        attributes: ["AstumAstaID"],
      }).then((result) => result.map((r) => r.AstumAstaID));

      const excludedAstaInversaIDs = await AstaInversa.findAll({
        attributes: ["AstumAstaID"],
      }).then((result) => result.map((r) => r.AstumAstaID));

    
      const allExcludedIDs = [
        ...new Set([...excludedAstaIDs, ...excludedAstaInversaIDs]),
      ];

      const asteAttive = await Asta.findAll({
        where: {
          dataFineAsta: {
            [Op.gt]: new Date(), 
          },
          statusAsta: "inVendita",
          astaID: {
      
            [Op.notIn]: allExcludedIDs, 
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

        
        if (tempoCorrente >= dataFineAsta && asta.statusAsta === "inVendita") {
          const offertaMassima = await OffertaCTRL.trovaOffertaMassimaPerAsta(
            asta.astaID
          );

          if (offertaMassima) {
            const { offertaMax, UtenteNickname } = offertaMassima;

            if (offertaMax > 0) {
              
              const utente = await Utente.findOne({
                where: { nickname: UtenteNickname },
              });

              if (!utente || utente.saldo < offertaMax) {
                console.error(
                  `Saldo insufficiente per ${UtenteNickname} o utente non trovato.`
                );
                continue; 
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
            
            asta.statusAsta = "nonVenduto";
            asta.prezzofinale = 0;
            console.log(`Asta non venduta. Nessuna offerta disponibile.`);
          }

          
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
    }, 1000); 
  }

 
  static async gestisciAstaAlRibasso() {
    try {

      const asteAlRibassoAttive = await AstaAlRibasso.findAll({
        where: {
         
        },
      });

      const currentTime = new Date();

      for (let astaRibasso of asteAlRibassoAttive) {
       
        const asta = await Asta.findOne({
          where: {
            astaID: astaRibasso.AstumAstaID,
            statusAsta: "inVendita",
            dataFineAsta: { [Op.gt]: currentTime }, 
          },
        });

        
        if (!asta) {
          console.log(
            `Asta non trovata per l'asta al ribasso ID: ${astaRibasso.id}`
          );
          continue; 
        }

        const timeSinceLastDecrement = currentTime - astaRibasso.updatedAt; 


        if (timeSinceLastDecrement >= astaRibasso.decrementoTimer * 1000) {
          const newPrice = asta.prezzoiniziale - astaRibasso.valoreDecremento;

      
          if (newPrice <= astaRibasso.prezzoMinSegreto) {
     
            asta.statusAsta = "nonVenduto";
            await asta.save();

            console.log(
              `Asta al ribasso fallita. Il prezzo ha raggiunto il minimo segreto per l'asta con ID: ${asta.astaID}`
            );
            continue;
          }

          
          asta.prezzoiniziale = newPrice;
          asta.updatedAt = new Date(); 
          await asta.save();

          console.log(
            `Prezzo ridotto per l'asta al ribasso con ID: ${asta.astaID}. Nuovo prezzo: ${newPrice}`
          );
        }

        
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
      throw error;
    }
  }

  static avviaControlloAsteAlRibasso() {
    const intervalId = setInterval(async () => {
      try {
        await AstaCTRL.gestisciAstaAlRibasso();
      } catch (error) {
        console.error(
          "Errore durante il controllo delle aste al ribasso:",
          error
        );

        clearInterval(intervalId);
      }
    }, 10000);
  }



  static async creaAstaInversa(req) {
    const transaction = await Asta.sequelize.transaction();

    try {
      const {
        titoloAsta,
        nomeProdotto,
        prezzoIniz,
        oreAsta,
        categoria,
        url,
        descrizione,
      } = req.body;
      const fileUrl = req.file ? req.file.filename : null;
      const user = await Utente.findOne({ where: { email: req.user.email } });

      if (!user) {
        throw new Error("User not found");
      }

      const utenteNickname = user.nickname;

      const astaData = {
        nomeBeneInVendita: nomeProdotto,
        titolo: titoloAsta,
        categoria: categoria,
        tipoBeneInVendita: "servizio", 
        descrizioneAsta: descrizione,
        prezzoiniziale: parseFloat(prezzoIniz),
        dataFineAsta: new Date(Date.now() + oreAsta * 3600000),
        url: fileUrl,
        statusAsta: "inVendita",
        UtenteNickname: utenteNickname,
      };

     
      const asta = await Asta.create(astaData, { transaction });

      const astaInversaData = {
        AstumAstaID: asta.astaID, 
      };

      await AstaInversa.create(astaInversaData, { transaction });

      await transaction.commit();

      console.log("Asta Inversa creata con successo:", asta);
      return asta;
    } catch (error) {
      await transaction.rollback();
      console.error("Errore durante la creazione dell'asta inversa:", error);
      throw error;
    }
  }

  static async gestisciAstaInversa(astaID, nuovaOfferta, venditoreNickname) {
    if (astaID == null) {
      throw new Error("Il parametro 'astaID' non può essere null o undefined.");
    }
    if (nuovaOfferta == null) {
      throw new Error("Il parametro 'nuovaOfferta' non può essere null o undefined.");
    }
    if (!venditoreNickname) {
      throw new Error("Il parametro 'venditoreNickname' non può essere null, undefined o una stringa vuota.");
    }
    try {
      const asta = await Asta.findOne({
        where: { astaID, statusAsta: "inVendita" },
      
        include: [
          {
            model: AstaInversa,
            attributes: ["AstumAstaID"],
          },
        ],
      });

      if (!asta) {
        throw new Error(`Asta Inversa con ID ${astaID} non trovata.`);
      }


      const offertaAttuale = await Offerta.findOne({
        where: { AstumAstaID: astaID },
        order: [["valore", "ASC"]],
      });

      if (offertaAttuale && nuovaOfferta >= offertaAttuale.valore) {
        throw new Error(
          "L'offerta deve essere inferiore all'offerta più bassa attuale."
        );
      }


      await Offerta.create({
        AstumAstaID: astaID,
        UtenteNickname: venditoreNickname,
        valore: nuovaOfferta,
      });

      console.log(
        `Nuova offerta accettata: ${nuovaOfferta} da ${venditoreNickname}`
      );
      return true;
    } catch (error) {
      console.error("Errore durante la gestione dell'asta inversa:", error);
      throw error;
    }
  }

  static async controllaScadenzaAstaInversa() {
    try {
      const asteInverse = await AstaInversa.findAll({
        include: [
          {
            model: Asta,
            where: {
              dataFineAsta: {
                [Op.lt]: new Date(), 
              },
              statusAsta: "inVendita",
            },
          },
        ],
      });

      for (let astaInversa of asteInverse) {
        const asta = astaInversa.Asta;

       
        const offertaPiuBassa = await Offerta.findOne({
          where: { AstaAstaID: asta.astaID },
          order: [["valore", "ASC"]],
        });

        if (offertaPiuBassa) {
          asta.statusAsta = "venduto";
          asta.prezzofinale = offertaPiuBassa.valore;
          await asta.save();

          console.log(
            `Asta inversa conclusa. Venditore ${offertaPiuBassa.UtenteNickname} ha vinto con un'offerta di ${offertaPiuBassa.valore}.`
          );
        } else {
          asta.statusAsta = "nonVenduto";
          asta.prezzofinale = 0;
          await asta.save();
          console.log(`Asta inversa conclusa senza vincitore.`);
        }
      }
    } catch (error) {
      console.error(
        "Errore durante la gestione della scadenza dell'asta inversa:",
        error
      );
      throw error;
    }
  }

  static async recuperaAsteInverseAttive() {
    try {
     
      const asteInverseAttive = await AstaInversa.findAll({
        attributes: ["AstumAstaID"], 
      });
  
      const activeAstaIDs = asteInverseAttive.map((item) => item.AstumAstaID);
  
      if (activeAstaIDs.length === 0) {
        console.log("Nessuna asta inversa attiva");
        return [];
      }
  
      
      const astasInverse = await Asta.findAll({
        where: {
          astaID: {
            [Op.in]: activeAstaIDs,
          },
          statusAsta: "inVendita",
          dataFineAsta: {
            [Op.gt]: new Date(), 
          },
        },
      });
  
      if (astasInverse.length > 0) {
        console.log("Aste inverse attive:", astasInverse);
      } else {
        console.log("Nessuna asta inversa è attiva");
      }
  
      return astasInverse;
    } catch (error) {
      console.error("Errore nel recupero delle aste inverse attive:", error);
      throw error;
    }
  }
}  