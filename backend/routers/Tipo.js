import express from "express";
import { authToken } from "../middleware/Auth.js";
import { UtenteCTRL } from "../controllers/UtenteCTRL.js";

export const setUser = express.Router();

setUser.post("/setUser", authToken, async (req, res) => {
  UtenteCTRL.setTipoUtente(req.body.tipo, req.user.email);
});
