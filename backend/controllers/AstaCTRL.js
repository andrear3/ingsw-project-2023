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
    let utente = Asta.build(req.body);
    await utente.save();

    await nuovaOfferta.save();
    console.log("Offerta Saved to database.");
  }



}
