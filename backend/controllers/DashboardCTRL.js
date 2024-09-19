import { Asta } from "../models/Database.js";
import { Offerta } from "../models/Database.js";
import { Utente } from "../models/Database.js";
import { Sequelize, Op } from "sequelize";

export class DashboardCTRL {
  static async populateDashboard(nickname) {
    try {
      const aste = await Asta.findAll({
        where: {
          UtenteNickname: nickname,
          statusAsta: "venduto",
        },
      });

      return aste;
    } catch (error) {
      console.error(
        `Errore nel recupero delle aste di utente: ${nickname}:`,
        error
      );
      throw error;
    }
  }
}
