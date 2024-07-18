import express from "express";
import { Utente } from "./models/Database.js";
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";

const app = express();

const PORT = 3000;


UtenteCTRL.stampaTuttiUtenti();

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
