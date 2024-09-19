//GENERAL IMPORTS

import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

//CONTROLLERS
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";
import { OffertaCTRL } from "./controllers/OffertaCTRL.js";
import { AstaCTRL } from "./controllers/AstaCTRL.js";
import { authToken } from "./middleware/Auth.js";

//ROUTERS
import { homepageRouter } from "./routers/Homepage.js";
import { registrationRouter } from "./routers/Registration.js";
import { loginRouter } from "./routers/LogIn.js";

//IMPORTS PER IMMAGINI
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { productRouter } from "./routers/Product.js";
import { dashboardRouter } from "./routers/Dashboard.js";

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

//TESTING

const posts = [
  {
    email: "kikkowoman@mail.com",
    password: "1234",
  },
  {
    email: "kikkoman@mail.com",
    password: "4321",
  },
];

AstaCTRL.stampaTutteAste();

//STAMPA DELLE ASTE ATTIVE
//setInterval(AstaCTRL.recuperaAsteAttive, 10000);

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
