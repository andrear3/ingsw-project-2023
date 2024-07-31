import express from "express";
import { Utente } from "./models/Database.js";
import { UtenteCTRL } from "./controllers/UtenteCTRL.js";
import { homepageRouter } from "./routers/Homepage.js";

//imports per immagini
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";


//usato per mandare immagini
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = 3000;

UtenteCTRL.salvaUtente("rosser34","Rossella", "Trix", "roxtrix@gmail.com","compratore","Lombardia","https://www.passportjs.org/", "ViaGiuseppeVerdi,10,20900,Monza,MB","rossa");

UtenteCTRL.stampaTuttiUtenti();

const checkValue = async () => {
  try {
    console.log('Checking value...');
 
  } catch (error) {
    console.error('Error checking value:', error);
  }
};


setInterval(checkValue, 6000);


app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.get('/test', (req, res) => {
  //res.sendFile(__dirname + '/gameboy.jpg');
  res.sendFile(path.join(__dirname, '.', 'resources', 'images', 'gameboy.jpg'));
});

app.use(homepageRouter);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
