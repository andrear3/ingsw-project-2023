import express from "express";
import path from "path";

import { authToken } from "../middleware/Auth.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";
import { UtenteCTRL } from "../controllers/UtenteCTRL.js";
import { fileURLToPath } from "url";

export const homepageRouter = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

homepageRouter.get("/homepage", authToken, async (req, res) => {
  try {

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


    const baseUrl = req.protocol + "://" + req.get("host") + "/images/";


    const userWithTransformedUrl = {
      ...user.toJSON(),
      url: user.url ? baseUrl + user.url : null, 
    };

    const datiConOfferteETempo = asteAttive.map((asta) => ({
      ...asta.toJSON(),
      url: baseUrl + asta.url,
      offertaMax: mappaOfferteMassime[asta.dataValues.astaID] || null,
      timeLeft: mappaTimeLeft[asta.dataValues.astaID] || null,
    }));

    res.json({ aste: datiConOfferteETempo, userInfo: userWithTransformedUrl }); 
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});


homepageRouter.get("/homepage/inversa", authToken, async (req, res) => {
  try {

    let asteAttive = await AstaCTRL.recuperaAsteInverseAttive(); 
    let user = await UtenteCTRL.recuperaUtenteByEmail(req.user.email);

    if (!asteAttive || asteAttive.length === 0) {
      return res.status(404).json({ message: "Nessuna asta trovata" });
    }

    let idAste = asteAttive.map((item) => item.dataValues.astaID);

    const offerteMinime = await OffertaCTRL.trovaOffertaMinima(idAste);
    const timeLeftForAste = await AstaCTRL.getTimeLeftForAsteByIds(idAste);

    const mappaOfferteMinime = offerteMinime.reduce((map, offerta) => {
      map[offerta.AstumAstaID] = offerta.offertaMin;
      return map;
    }, {});

    const mappaTimeLeft = timeLeftForAste.reduce((map, timeLeft) => {
      map[timeLeft.id] = timeLeft.timeLeft;
      return map;
    }, {});

    
    const baseUrl = req.protocol + "://" + req.get("host") + "/images/";

   
    const userWithTransformedUrl = {
      ...user.toJSON(),
      url: user.url ? baseUrl + user.url : null, 
    };

    const datiConOfferteETempo = asteAttive.map((asta) => ({
      ...asta.toJSON(),
      url: asta.url ? baseUrl + asta.url : null, 
      offertaMin: mappaOfferteMinime[asta.dataValues.astaID] || null,
      timeLeft: mappaTimeLeft[asta.dataValues.astaID] || null,
    }));

    res.json({ aste: datiConOfferteETempo, userInfo: userWithTransformedUrl });
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});


homepageRouter.get("/homepage/ribasso", authToken, async (req, res) => {
  try {
    let asteAlRibasso = await AstaCTRL.recuperaAsteAlRibassoAttive(); 
    let user = await UtenteCTRL.recuperaUtenteByEmail(req.user.email);

    if (!asteAlRibasso || asteAlRibasso.length === 0) {
      return res
        .status(404)
        .json({ message: "Nessuna asta al ribasso trovata" });
    }

    let idAste = asteAlRibasso.map((item) => item.dataValues.astaID);

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

    const baseUrl = req.protocol + "://" + req.get("host") + "/images/";

    const userWithTransformedUrl = {
      ...user.toJSON(),
      url: user.url ? baseUrl + user.url : null,
    };

    const datiConOfferteETempo = asteAlRibasso.map((asta) => ({
      ...asta.toJSON(),
      url: baseUrl + asta.url,
      offertaMax: mappaOfferteMassime[asta.dataValues.astaID] || null,
      timeLeft: mappaTimeLeft[asta.dataValues.astaID] || null,
    }));

    res.json({ aste: datiConOfferteETempo, userInfo: userWithTransformedUrl });
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
