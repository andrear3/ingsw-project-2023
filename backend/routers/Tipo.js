import express from "express";
import { authToken } from "../middleware/Auth.js";
import { UtenteCTRL } from "../controllers/UtenteCTRL.js";

export const setUser = express.Router();

setUser.post("/setUser", authToken, async (req, res) => {
  try {
    console.log("Test di router TIPO");
    console.log(req.body.tipo, req.user.email);

    // Chiamo la funzione che imposta il tipo utente
    const result = await UtenteCTRL.setTipoUtente(req.body.tipo, req.user.email);

    // Restituisco una risposta al client
    res.status(200).json({ message: 'Tipo utente impostato con successo', result });
  } catch (error) {
    // In caso di errore, restituisco un errore al client
    console.error("Errore impostazione tipo utente:", error);
    res.status(500).json({ message: 'Errore impostazione tipo utente', error });
  }
});

