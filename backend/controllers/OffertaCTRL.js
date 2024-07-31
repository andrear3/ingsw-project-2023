import { Offerta } from "../models/Database.js";
import { Sequelize } from "sequelize";

export class OffertaCTRL {
  static async creaOfferta(valore, UtenteNickname, AstumAstaID) {
    let nuovaOfferta = new Offerta({
      valore: valore,
      UtenteNickname: UtenteNickname,
      AstumAstaID: AstumAstaID
    });

    await nuovaOfferta.save();
    console.log("Offerta Saved to database.");
  }

}
