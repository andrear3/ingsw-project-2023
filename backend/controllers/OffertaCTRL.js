import { Offerta, Asta, Utente } from "../models/Database.js";
import { Op, fn, col } from "sequelize";

export class OffertaCTRL {
  static async creaOfferta(valore, UtenteNickname, AstumAstaID) {
    try {
      let asta = await Asta.findOne({ where: { astaID: AstumAstaID } });

      if (!asta) {
        console.log("Asta non trovata.");
        return;
      }

      let utente = await Utente.findOne({
        where: { nickname: UtenteNickname },
      });

      if (!utente) {
        console.log("Utente non trovato.");
        return;
      }

      if (utente.saldo < valore) {
        console.log("Saldo insufficiente per l'offerta.");
        console.log(`Saldo disponibile: ${utente.saldo}, Offerta: ${valore}`);
        return;
      }

      if (valore >= asta.prezzoiniziale) {
        let nuovaOfferta = new Offerta({
          valore: valore,
          UtenteNickname: UtenteNickname,
          AstumAstaID: AstumAstaID,
        });

        await nuovaOfferta.save();
        console.log("Offerta salvata nel database.");
        console.log(
          `Prezzo iniziale: ${asta.prezzoiniziale}, Offerta: ${valore}`
        );
      } else {
        console.log("Offerta troppo bassa.");
        console.log(
          `Prezzo iniziale: ${asta.prezzoiniziale}, Offerta: ${valore}`
        );
      }
    } catch (error) {
      console.error("Errore nel creare offerta", error);
    }
  }

  static async creaOffertaInversa(valore, UtenteNickname, AstumAstaID) {
    try {
      let asta = await Asta.findOne({ where: { astaID: AstumAstaID } });

      if (!asta) {
        return "Asta non trovata.";
      }

      let utente = await Utente.findOne({
        where: { nickname: UtenteNickname },
      });

      if (!utente) {
        return "Utente non trovato.";
      }

      if (utente.saldo < valore) {
        return `Saldo insufficiente per l'offerta. Saldo disponibile: ${utente.saldo}, Offerta: ${valore}`;
      }

      let prezzoCorrente = await OffertaCTRL.trovaOffertaMinimaPerAsta(
        AstumAstaID
      ).offertaMin;

      if (valore > 0 && valore < asta.prezzoiniziale) {
        
        if (prezzoCorrente == null || valore < prezzoCorrente) {
          let nuovaOfferta = new Offerta({
            valore: valore,
            UtenteNickname: UtenteNickname,
            AstumAstaID: AstumAstaID,
          });

          await nuovaOfferta.save();
          return (
            "Offerta salvata nel database. Prezzo iniziale: " +
            asta.prezzoiniziale +
            ", Offerta: " +
            valore
          );
        }
      } else {
        return (
          "Offerta troppo alta. Prezzo iniziale: " +
          asta.prezzoiniziale +
          ", Offerta: " +
          valore
        );
      }
    } catch (error) {
      return "Errore nel creare offerta: " + error.message;
    }
  }

  static async trovaOffertaMassima(ids) {
    try {
      const offerte = await Offerta.findAll({
        attributes: ["AstumAstaID", [fn("MAX", col("valore")), "offertaMax"]],
        where: {
          AstumAstaID: {
            [Op.in]: ids,
          },
        },
        group: ["AstumAstaID"],
      });

      return offerte.map((offerta) => ({
        AstumAstaID: offerta.dataValues.AstumAstaID,
        offertaMax: offerta.dataValues.offertaMax,
      }));
    } catch (error) {
      console.error("Error finding maximum offers:", error);
      throw error;
    }
  }

  static async trovaOffertaMinima(ids) {
    try {
      const offerte = await Offerta.findAll({
        attributes: ["AstumAstaID", [fn("MIN", col("valore")), "offertaMin"]],
        where: {
          AstumAstaID: {
            [Op.in]: ids,
          },
        },
        group: ["AstumAstaID"],
      });

      return offerte.map((offerta) => ({
        AstumAstaID: offerta.dataValues.AstumAstaID,
        offertaMin: offerta.dataValues.offertaMin,
      }));
    } catch (error) {
      console.error("Error finding minimum offers:", error);
      throw error;
    }
  }

  static async trovaOffertaMassimaPerAsta(AstumAstaID) {
    try {
      const offerte = await Offerta.findOne({
        attributes: [
          [fn("MAX", col("valore")), "offertaMax"],
          "UtenteNickname",
        ],
        where: { AstumAstaID: AstumAstaID },
        group: ["UtenteNickname"],
      });

      return offerte
        ? {
            offertaMax: offerte.dataValues.offertaMax,
            UtenteNickname: offerte.dataValues.UtenteNickname,
          }
        : null;
    } catch (error) {
      console.error("Error finding maximum offer for auction:", error);
      throw error;
    }
  }

  static async trovaOffertaMinimaPerAsta(AstumAstaID) {
    try {
      const offerte = await Offerta.findOne({
        attributes: [
          [fn("MIN", col("valore")), "offertaMin"],
          "UtenteNickname",
        ],
        where: { AstumAstaID: AstumAstaID },
        group: ["UtenteNickname"],
      });

      return offerte
        ? {
            offertaMin: offerte.dataValues.offertaMin,
            UtenteNickname: offerte.dataValues.UtenteNickname,
          }
        : null;
    } catch (error) {
      console.error("Error finding minimum offer for auction:", error);
      throw error;
    }
  }
}
