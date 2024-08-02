import express from "express";
import { isAuthenticated } from "../middleware/Auth.js";
import { Utente } from "../models/Database.js";

export const homepageRouter = express.Router();

homepageRouter.get("/homepage", async (req, res) => {
  console.log("1111111111111111111111111111111111111111111");
  console.log(req.session.user);
  try {
    let info = await Utente.findAll();
    if (info) {
      res.json(info);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

homepageRouter.get("/user", isAuthenticated, (req, res) => {
  res.json(req.session.user);
});
