import express from "express";
import path from "path";
import { Asta } from "../models/Database.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";

export const homepageRouter = express.Router();

homepageRouter.get("/homepage", async (req, res) => {
  try {
    // Recupera le aste attive
    let asteAttive = await AstaCTRL.recuperaAsteAttive();

    if (!asteAttive || asteAttive.length === 0) {
      return res.status(404).json({ message: "Nessuna asta trovata" });
    }

    // Estrai gli ID delle aste dal modello nel DB
    let idAste = asteAttive.map((item) => item.dataValues.astaID);

    // Recupera le offerte massime per gli ID delle aste
    const offerteMassime = await OffertaCTRL.trovaOffertaMassima(idAste);

    // Estae in una mappa le offerte massime
    const mappaOfferteMassime = offerteMassime.reduce((map, offerta) => {
      map[offerta.AstumAstaID] = offerta.offertaMax;
      return map;
    }, {});

    // Aggiungi i dati delle offerte massime a ciascuna asta
    const baseUrl = req.protocol + "://" + req.get("host") + "/images/";
    const datiConOfferte = asteAttive.map((asta) => ({
      ...asta.toJSON(),
      url: baseUrl + asta.url,
      offertaMax: mappaOfferteMassime[asta.dataValues.astaID] || null,
    }));

    // Invia i dati combinati come risposta JSON
    res.json(datiConOfferte);
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

homepageRouter.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const options = {
    root: path.join(__dirname, "..", "resources", "images"),
    dotfiles: "deny",
  };

  res.sendFile(filename, options, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).json({ message: "File not found" });
    }
  });
});
