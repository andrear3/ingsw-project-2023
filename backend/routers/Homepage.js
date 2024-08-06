import express from "express";
import path from "path";
import { Asta } from "../models/Database.js";
import { AstaCTRL } from "../controllers/AstaCTRL.js";

export const homepageRouter = express.Router();

homepageRouter.get("/homepage", async (req, res) => {
  try {
    //let info = await Asta.findAll();
    let info = await AstaCTRL.stampaAsteAttive();
    if (info) {
      const baseUrl = req.protocol + "://" + req.get("host") + "/images/";
      const dataWithFullUrl = info.map((asta) => ({
        ...asta.toJSON(),
        url: baseUrl + asta.url,
      }));
      res.json(dataWithFullUrl);
    } else {
      res.status(404).json({ message: "Asta not found" });
    }
  } catch (error) {
    console.error("Error fetching asta:", error);
    res.status(500).json({ message: "Server error" });
  }
});

homepageRouter.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const options = {
    root: path.join(__dirname, "..", "resources", "images"),
    dotfiles: "deny",
  };

  res.sendFile(filename, options, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).json({ message: "File not found" });
    }
  });
});
