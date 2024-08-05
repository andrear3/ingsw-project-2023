import { Asta } from "../models/Database.js";
import { Sequelize } from "sequelize";

export class AstaCTRL {
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
    let asta = Asta.build(req.body);
    await asta.save();

    console.log("Asta Saved to database.");
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
  static async controllaTempoAsta() {
    try {
      let asta = await AstaCTRL.cercaAsta(3); //esempio!

      const dataCorrente = new Date();
      console.log(dataCorrente);
      console.log(asta.createdAt);
      const dataAsta = new Date(asta.createdAt);
      console.log(dataAsta);

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
}

