import express from "express";
import { Utente } from "../models/Database.js";

export const registrationRouter = express.Router();

registrationRouter.post("/registration", async (req, res) => {
  console.log("Received data:", req.body);

  try {
    const saldo = generateSaldo();

    //aggiungo ai dati l'attributo saldo:
    let utenteData = {
      ...req.body.utente,
      saldo: saldo,
      url: "default-profile.png",
      descrizione: "Inserisci qui la tua descrizione!",
      link1: "Inserisci un link!",
      link2: "Inserisci un link!",
      link3: "Inserisci un link!",
    };

    console.log(utenteData);

    let utente = Utente.build(utenteData);
    await utente.save();
    res.status(201).json(utente);
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error during registration", error: error.message });
  }
});

function generateSaldo() {
  return Math.floor(Math.random() * (2500 - 500 + 1)) + 500;
}

console.log(generateSaldo());
