import express from "express";
import { authToken } from "../middleware/Auth.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";
import { UtenteCTRL } from "../controllers/UtenteCTRL.js";

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

//DA TESTAREEEEEEEEEEEEEEEEEEE
productRouter.post("/auctionInversaView", authToken, async (req, res) => {
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


productRouter.post("/123", authToken, async (req, res) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  try {
    if (req.body.mode == 0) {
      await UtenteCTRL.diminuisciSaldo(req.user.email, req.body.valore);
      res.status(200).json({ message: "Update: Diminuisci" });
    } else if (req.body.mode == 1) {
      await UtenteCTRL.aumentaSaldo(req.user.email, req.body.valore);
      res.status(200).json({ message: "Update: Aumenta" });
    } else {
    res.status(200).json({ message: "Update"});
    }
  } catch (error) {
    console.error("Error creating auction:", error);
    res.status(500).json({ message: "Error processing auction", error });
  }
});