
import { Asta } from "../models/Database.js";


export class DashboardCTRL {
  static async populateDashboard(nickname) {
    try {
      const aste = await Asta.findAll({
        where: {
          UtenteNickname: nickname,
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
