import express from "express";
import { authToken } from "../middleware/Auth.js";
import { OffertaCTRL } from "../controllers/OffertaCTRL.js";

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