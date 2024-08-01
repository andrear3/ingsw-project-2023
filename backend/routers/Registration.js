
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