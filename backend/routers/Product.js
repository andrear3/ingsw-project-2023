import express from "express";
import { authToken } from "../middleware/Auth.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";

export const productRouter = express.Router();

productRouter.post("/auctionView", authToken, async (req, res) => {
  const { valore, UtenteNickname, AstumAstaID } = req.body;

  if (!valore || !UtenteNickname || !AstumAstaID) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    await OffertaCTRL.creaOfferta(valore, UtenteNickname, AstumAstaID);
    res.status(201).json({ message: "Offer created successfully." });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/auctionRibassoView", authToken, async (req, res) => {
  const { UtenteNickname, AstumAstaID } = req.body;

  if (!UtenteNickname || !AstumAstaID) {
    return res.status(400).json({ error: "Campi richiesti mancanti." });
  }

  try {
    const prezzoCorrente = await AstaCTRL.ottieniPrezzoCorrenteAstaRibasso(
      AstumAstaID
    );

    await OffertaCTRL.creaOfferta(prezzoCorrente, UtenteNickname, AstumAstaID);
    await AstaCTRL.gestisciAstaAlRibasso();

    res
      .status(201)
      .json({ message: "Offerta per asta al ribasso creata con successo." });
  } catch (error) {
    console.error(
      "Errore durante la gestione dell'offerta per l'asta al ribasso:",
      error
    );
    res.status(500).json({ error: error.message });
  }
});
