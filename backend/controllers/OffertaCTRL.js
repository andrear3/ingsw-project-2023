import { Offerta } from "../models/Database.js";
import { Op, fn, col } from "sequelize";

export class OffertaCTRL {
  static async creaOfferta(valore, UtenteNickname, AstumAstaID) {
    let nuovaOfferta = new Offerta({
      valore: valore,
      UtenteNickname: UtenteNickname,
      AstumAstaID: AstumAstaID,
    });

    await nuovaOfferta.save();
    console.log("Offerta Saved to database.");
  }

  static async trovaOffertaMassima(ids) {
    try {
      const offerte = await Offerta.findAll({
        attributes: [
          'AstumAstaID', // Use AstumAstaID for grouping
          [fn('MAX', col('valore')), 'offertaMax'], 
        ],
        where: {
          AstumAstaID: {
            [Op.in]: ids,
          },
        },
        group: ['AstumAstaID'], 
      });

      return offerte.map(offerta => ({
        AstumAstaID: offerta.dataValues.AstumAstaID, 
        offertaMax: offerta.dataValues.offertaMax,
      }));
    } catch (error) {
      console.error("Error finding maximum offers:", error);
      throw error;
    }
  }



  /*
  static async recuperaOffertaMassima(aste) {
    const offerteMassime = await Offerta.findAll({
      where: {

      }
    })
  }

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
    */
}
