import express from "express";
import { Utente } from "./models/Database.js";
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";
import { homepageRouter } from "./routers/Homepage.js";
import { registrationRouter } from "./routers/Registration.js";

import { OffertaCTRL } from "./controllers/OffertaCTRL.js";

//imports per immagini
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

//temp
import bodyParser from "body-parser";



//usato per mandare immagini
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

//MIDDLEWARE PER PARSING BODY DEL CLIENT.
app.use(express.json());

//temp
app.use(bodyParser.json()); // To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

 
const PORT = 3000;



UtenteCTRL.stampaTuttiUtenti();


/* FUNZIONE PER ASTA TIMER : >>>>
const checkValue = async () => {
  try {
    console.log('Checking value...');
 
  } catch (error) {
    console.error('Error checking value:', error);
  }
};


setInterval(checkValue, 6000);
*/

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//test per mandare user a db


app.get('/test', (req, res) => {
  //res.sendFile(__dirname + '/gameboy.jpg');
  res.sendFile(path.join(__dirname, '.', 'resources', 'images', 'gameboy.jpg'));
});

app.use(homepageRouter);
app.use(registrationRouter);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
