import { Asta } from "../models/Database.js";
import { Sequelize } from "sequelize";

export class AstaCTRL {
    static async stampaTutteAste() {
        try {
          const aste = await Asta.findAll();
          aste.forEach((asta) => {
            console.log(aste.toJSON());
          });
        } catch (error) {
          console.error("Errore nel recupero delle Aste!", error);
        }
      }
}