import express from "express";
import session from "express-session";

import cors from "cors";
import { createHash } from "crypto";

import { Utente } from "./models/Database.js";
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";
import { OffertaCTRL } from "./controllers/OffertaCTRL.js";
import { AstaCTRL } from "./controllers/AstaCTRL.js";

import { homepageRouter } from "./routers/Homepage.js";
import { registrationRouter } from "./routers/Registration.js";
import { loginRouter } from "./routers/LogIn.js";

//IMPORTS PER IMMAGINI
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

//TEMP
import bodyParser from "body-parser";

//USATO PER MANDARE IMMAGINI
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//MIDDLEWARE PER PARSING BODY DEL CLIENT.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

//TEMP
app.use(bodyParser.json()); // Parsing JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); //CORS SETTINGS

const PORT = 3000;

//TESTING
AstaCTRL.stampaTutteAste();
AstaCTRL.recuperaAsteAttive();

//STAMPA DELLE ASTE ATTIVE
setInterval(AstaCTRL.recuperaAsteAttive, 10000);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  //res.sendFile(__dirname + '/gameboy.jpg');
  res.sendFile(path.join(__dirname, ".", "resources", "images", "gameboy.jpg"));
});

app.use(homepageRouter);
app.use(registrationRouter);
app.use(loginRouter);

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
