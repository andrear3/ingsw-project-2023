import express from "express";
import { Utente } from "../models/Database.js"; // Adjust this import based on your actual model path

export const registrationRouter = express.Router();

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

/* REGISTRATION ALTERNATIVA (NON USATA)
registrationRouter.post('/register', async (req, res) => {
    const { email, nome, cognome, password, nickname, tipo, regione, indirizzo } = req.body;
    try {
      const hashedPassword = createHash('sha256').update(password).digest('hex');
      console.log(req.body);
      const user = await Utente.create({ nickname, nome, cognome, email, tipo, regione, indirizzo, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  */
