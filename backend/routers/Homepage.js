import express from "express";
import { Utente } from "../models/Database.js";

export const homepageRouter = new express.Router();

homepageRouter.get('/homepage', async (req, res) => {
    try {
      let info = await Utente.findAll();
      if (info) {
        res.json(info);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });