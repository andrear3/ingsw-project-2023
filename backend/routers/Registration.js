
import express from "express";
import { Utente } from "../models/Database.js"; // Adjust this import based on your actual model path

export const registrationRouter = new express.Router();

registrationRouter.post("/registration", async (req, res) => {
  console.log("Received data:", req.body); // Log received data for debugging
  try {
    let utente = Utente.build(req.body);
    await utente.save();
    res.status(201).json(utente);
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error during registration", error: error.message });
  }
});


registrationRouter.post('/register', async (req, res) => {
    const { nickname, nome, cognome, email, tipo, regione, linkEsterni, indirizzo, password } = req.body;
    try {
      const hashedPassword = createHash('sha256').update(password).digest('hex');
      const user = await Utente.create({ nickname, nome, cognome, email, tipo, regione, linkEsterni, indirizzo, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  