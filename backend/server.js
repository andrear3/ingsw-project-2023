//GENERAL IMPORTS

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//CONTROLLERS
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";
import { AstaCTRL } from "./controllers/AstaCTRL.js";

//ROUTERS
import { homepageRouter } from "./routers/Homepage.js";
import { registrationRouter } from "./routers/Registration.js";
import { loginRouter } from "./routers/LogIn.js";

//IMPORTS PER IMMAGINI
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import { productRouter } from "./routers/Product.js";
import { dashboardRouter } from "./routers/Dashboard.js";
import { general } from "./routers/General.js";

//USATO PER MANDARE IMMAGINI
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//MIDDLEWARE PER PARSING BODY DEL CLIENT.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//GENERAL STATEMENTS !!!!!!!!
app.use(bodyParser.json()); // Parsing JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
); //CORS SETTINGS

const PORT = 3000;

//AstaCTRL.stampaTutteAste();

//STAMPA DELLE ASTE ATTIVE
//setInterval(AstaCTRL.recuperaAsteAttive, 10000);
AstaCTRL.avviaControlloScadenzaAste();
AstaCTRL.avviaControlloAsteAlRibasso();
//APP ROUTES

app.get("/test", (req, res) => {
  //res.sendFile(__dirname + '/gameboy.jpg');
  res.sendFile(path.join(__dirname, ".", "resources", "images", "gameboy.jpg"));
});

app.use("/images", express.static(path.join(__dirname, "resources", "images")));

app.use(homepageRouter);
app.use(registrationRouter);
app.use(loginRouter);
app.use(productRouter);
app.use(dashboardRouter);
app.use(general);

app.get("/Utente/nickname/:nickname", async (req, res) => {
  const { nickname } = req.params;
  try {
    const user = await UtenteCTRL.recuperaUtenteByNickname(nickname);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.json(user);
  } catch (error) {
    console.error("Errore nel recupero dell'utente:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
