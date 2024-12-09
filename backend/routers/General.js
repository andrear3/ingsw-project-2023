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

general.post("/setUser", authToken, async (req, res) => {
  try {
    console.log("Request to set user type received");
    const result = await UtenteCTRL.setTipoUtente(
      req.body.tipo,
      req.user.email
    );
    res.status(200).json({ message: "User type successfully set", result });
  } catch (error) {
    console.error("Error setting user type:", error);
    res.status(500).json({ message: "Error setting user type", error });
  }
});

general.post(
  "/creaAsta",
  authToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Auction creation request received:", req.body);
      if (req.file) {
        console.log("File received:", req.file.originalname);
      } else {
        console.log("No file received.");
      }

      await AstaCTRL.creaAsta(req);
      res.status(200).json({ message: "Auction created successfully" });
    } catch (error) {
      console.error("Error creating auction:", error);
      res.status(500).json({ message: "Error processing auction", error });
    }
  }
);

general.post(
  "/creaAstaRibasso",
  authToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Reverse auction creation request received:", req.body);
      await AstaCTRL.creaAstaRibasso(req);
      res.status(200).json({ message: "Reverse auction created successfully" });
    } catch (error) {
      console.error("Error creating reverse auction:", error);
      res
        .status(500)
        .json({ message: "Error processing reverse auction", error });
    }
  }
);

general.post(
  "/creaAstaInversa",
  authToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Inversa auction creation request received:", req.body);
      await AstaCTRL.creaAstaInversa(req);
      res.status(200).json({ message: "Inversa auction created successfully" });
    } catch (error) {
      console.error("Error creating inversa auction:", error);
      res
        .status(500)
        .json({ message: "Error processing inversa auction", error });
    }
  }
);

general.post("/password", authToken, async (req, res) => {
  try {
    await UtenteCTRL.modificaPassword(req.body.password, req.user.email);
    res.status(200).json({ message: "Password modificata con successo!" });
  } catch (error) {
    console.error("Errore nella modifica:", error);
    res.status(500).json({ message: "Errore nella modifica", error });
  }
});

general.post("/eliminaUtente", authToken, async (req, res) => {
  try {
    await UtenteCTRL.eliminaUtente(req.user.email);
    res.status(200).json({ message: "Eliminazione avvenuta con successo" });
  } catch (error) {
    console.error("Errore:", error);
    res.status(500).json({ message: "Errore", error });
  }
});

general.post(
  "/editprofile",
  authToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Profile update request received:", req.body);
      if (req.file) {
        console.log("File received:", req.file);
      } else {
        console.log("No file received.");
      }

      const {
        nome,
        cognome,
        tipo,
        regione,
        indirizzo,
        linkEsterni,
        descrizione,
        link1,
        link2,
        link3,
      } = req.body;

      const identifier = req.user.email;
      const imageUrl = req.file ? req.file.filename : null;

      await UtenteCTRL.modificaUtente({
        email: identifier,
        nome,
        cognome,
        tipo,
        regione,
        indirizzo,
        linkEsterni,
        url: imageUrl,
        descrizione,
        link1,
        link2,
        link3,
      });

      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.error("Error processing profile update:", error);
      res.status(500);
    }
  }
);
