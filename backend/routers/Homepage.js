import express from "express";
import path from "path";
import jwt from "jsonwebtoken";

import { authToken } from "../middleware/Auth.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";
import { Utente } from "../models/Database.js";
import { UtenteCTRL } from "../controllers/UtenteCTRL.js";

export const homepageRouter = express.Router();

homepageRouter.get("/homepage", authToken, async (req, res) => {
  try {
    // Queries
    let asteAttive = await AstaCTRL.recuperaAsteAttive();
    let user = await UtenteCTRL.recuperaUtenteByEmail(req.user.email);

    if (!asteAttive || asteAttive.length === 0) {
      return res.status(404).json({ message: "Nessuna asta trovata" });
    }

    let idAste = asteAttive.map((item) => item.dataValues.astaID);

    const offerteMassime = await OffertaCTRL.trovaOffertaMassima(idAste);
    const timeLeftForAste = await AstaCTRL.getTimeLeftForAsteByIds(idAste);

    const mappaOfferteMassime = offerteMassime.reduce((map, offerta) => {
      map[offerta.AstumAstaID] = offerta.offertaMax;
      return map;
    }, {});

    const mappaTimeLeft = timeLeftForAste.reduce((map, timeLeft) => {
      map[timeLeft.id] = timeLeft.timeLeft;
      return map;
    }, {});

    // Compose response to client
    const baseUrl = req.protocol + "://" + req.get("host") + "/images/";
    const datiConOfferteETempo = asteAttive.map((asta) => ({
      ...asta.toJSON(),
      url: baseUrl + asta.url,
      offertaMax: mappaOfferteMassime[asta.dataValues.astaID] || null,
      timeLeft: mappaTimeLeft[asta.dataValues.astaID] || null,
    }));

    res.json({ aste: datiConOfferteETempo, userInfo: user });  // Send user info separately
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
