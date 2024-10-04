import express from "express";
import { authToken } from "../middleware/Auth.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";
import { UtenteCTRL } from "../controllers/UtenteCTRL.js";

import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export const general = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../resources/images");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to set user type
general.post("/setUser", authToken, async (req, res) => {
  try {
    console.log("Test di router TIPO");
    console.log(req.body.tipo, req.user.email);

    const result = await UtenteCTRL.setTipoUtente(
      req.body.tipo,
      req.user.email
    );
    res
      .status(200)
      .json({ message: "Tipo utente impostato con successo", result });
  } catch (error) {
    console.error("Errore impostazione tipo utente:", error);
    res.status(500).json({ message: "Errore impostazione tipo utente", error });
  }
});

general.post(
  "/creaAsta",
  authToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Form fields received:", req.body);
      console.log("titoloAsta:", req.body.titoloAsta);
      console.log("nomeProdotto:", req.body.nomeProdotto);
      console.log("prezzoIniz:", req.body.prezzoIniz);
      console.log("oreAsta:", req.body.oreAsta);
      console.log("categoria:", req.body.categoria);
      console.log("descrizione:", req.body.descrizione);
      console.log(req.user.email);

      if (req.file) {
        console.log("File received:", req.file.originalname);
        console.log("File type:", req.file.mimetype);
        console.log("File size:", req.file.size);
      } else {
        console.log("No file received.");
      }

      await AstaCTRL.creaAsta(req);

      res.status(200);
    } catch (error) {
      console.error("Error nel ricevere dati Asta caricamento:", error);
      res.status(500).json({ message: "Errore nel processare Asta", error });
    }
  }
);
