import { Offerta } from "../models/Database.js";
import { Sequelize } from "sequelize";

export class OffertaCTRL {
  static async creaOfferta(Offerta) {
    let nuovaOfferta = new Opinion({
      valore: Offerta.valore,
    });

    await nuovaOfferta.save();
    console.log(title, "Offerta Saved to database.");
  }
}
